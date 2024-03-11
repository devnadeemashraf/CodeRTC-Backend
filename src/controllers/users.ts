import { Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";
import bcrypt from "bcrypt";

import { prisma } from "../prisma";

import { generateToken } from "../utils/tokens";

class UsersController {
  async registerNewUser(request: Request, response: Response) {
    const { name, username, password } = request.body;

    if (!username || !name || !password) {
      return response.status(401).json({
        status: "ERR",
        message: "One or more fields are missing.",
      });
    }

    const userFoundInDB = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (userFoundInDB) {
      return response.status(400).json({
        status: "ERR",
        message: "This Username is already taken",
      });
    }

    // Hash Password
    const userId = uuidV4();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        id: userId,
        username,
        name,
        password: hashedPassword,
      },
    });

    // Create New Token
    const accessToken = await generateToken(
      {
        id: userId,
        username,
      },
      "access_token"
    );

    // Create New Cookie
    response.cookie("access_token_crtc", accessToken);

    // Return User
    return response.status(200).json({
      status: "OK",
      message: "Registration Success.",
      user: newUser,
    });
  }

  async loginUser(request: Request, response: Response) {
    const { username, password } = request.body;

    if (!username || !password) {
      return response.status(400).json({
        message: "One or more fields are missing",
      });
    }

    const userFoundInDB = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!userFoundInDB) {
      return response.status(404).json({
        status: "ERR",
        message: "Cannot find user with this username.",
      });
    }

    const hashedPassword = userFoundInDB?.password;
    const passwordMatches = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatches) {
      return response.status(400).json({
        status: "ERR",
        message: "Invalid Username or Password.",
      });
    }

    // Create New Token
    const accessToken = await generateToken(
      {
        id: userFoundInDB.id,
        username: userFoundInDB.username,
      },
      "access_token"
    );

    // Create New Cookie
    response.cookie("access_token_crtc", accessToken);

    // Return User
    return response.status(200).json({
      status: "OK",
      message: "Log In Success",
      user: userFoundInDB,
    });
  }

  async getUserInfo(request: Request, response: Response) {
    const { userId } = request.params;

    if (!userId) {
      return response.status(400).json({
        message: "Invalid Params",
      });
    }

    const userFoundInDB = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!userFoundInDB) {
      return response.status(404).json({
        status: "ERR",
        message: "Cannot find user.",
      });
    }

    // Return User
    return response.status(200).json({
      status: "OK",
      message: "User Found",
      user: userFoundInDB,
    });
  }

  async deleteUser(request: Request, response: Response) {
    const user = request.user;

    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    response.clearCookie("access_token_crtc");

    return response.status(200).json({
      status: "OK",
      message: `UserID : ${user.id} and its corresponding relations have been entirely deleted.`,
    });
  }

  async logoutUser(request: Request, response: Response) {
    const user = request.user;

    // Remove Session from DB

    response.clearCookie("access_token_crtc");

    return response.status(200).json({
      status: "OK",
      message: `UserID : ${user.id} Logged Out Successfully.`,
    });
  }

  async returnAuthStatus(request: Request, response: Response) {
    const user = request.user;

    return response.status(200).json({
      status: "OK",
      message: "Authorized",
      user: user,
    });
  }
}

export default new UsersController();
