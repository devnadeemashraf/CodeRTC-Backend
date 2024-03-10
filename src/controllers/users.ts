import { Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";

import { prisma } from "../prisma";

import { compareHashedPassword, hashPassword } from "../utils/bcrypt";
import { generateToken } from "../utils/tokens";

class UsersController {
  async registerNewUser(request: Request, response: Response) {
    const { name, username, password } = request.body;

    if (!username || !name || !password) {
      return response.status(400).json({
        message: "One or more fields are missing",
      });
    }

    const userFromDB = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (userFromDB) {
      return response.status(400).json({
        message: "Username Already Exists",
      });
    }

    // Hash Password
    const userId = uuidV4();
    const hashedPassword = await hashPassword(password);

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
    response.cookie("accessToken", accessToken);
    response.status(200);

    // Return User
    return response.json({
      message: "Registration Successfull ",
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

    const userFromDB = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!userFromDB) {
      return response.status(400).json({
        message: "Invalid Username or Password",
      });
    }

    const hashedPassword = userFromDB?.password;
    const passwordMatches = await compareHashedPassword(
      password,
      hashedPassword
    );

    if (!passwordMatches) {
      return response.status(400).json({
        message: "Invalid Username or Password",
      });
    }

    // Create New Token
    const accessToken = await generateToken(
      {
        id: userFromDB.id,
        username: userFromDB.username,
      },
      "access_token"
    );

    // Create New Cookie
    response.cookie("accessToken", accessToken);
    response.status(200);

    // Return User
    return response.json({
      message: "Logged In",
      user: userFromDB,
    });
  }

  async deleteUser(request: Request, response: Response) {
    const user = request.user;

    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    response.clearCookie("accessToken");

    return response.status(200).json({
      message: `UserID : ${user.id} and its corresponding relations have been entirely deleted.`,
    });
  }

  async logoutUser(request: Request, response: Response) {
    const user = request.user;

    // Remove Session from DB

    response.clearCookie("accessToken");

    return response.status(200).json({
      message: `UserID : ${user.id} Logged Out Successfully.`,
    });
  }

  async returnAuthStatus(request: Request, response: Response) {
    const user = request.user;

    return response.status(200).json({
      message: "Authorized",
      user,
    });
  }
}

export default new UsersController();
