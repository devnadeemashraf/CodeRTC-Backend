import { PrismaClient } from "@prisma/client";

class PrismaDriver {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  instance() {
    return this.prisma;
  }
}

export default new PrismaDriver().instance();
