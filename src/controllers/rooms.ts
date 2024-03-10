import { Request, Response } from "express";

import { generateSlug } from "random-word-slugs";

import { prisma } from "../prisma";

class RoomsController {
  async createNewRoom(request: Request, response: Response) {
    // Generate New Slug
    const roomSlug = String(`${generateSlug()}-${Date.now()}`);
  }
}

export default new RoomsController();
