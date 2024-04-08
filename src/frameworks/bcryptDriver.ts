import bcrypt from "bcrypt";

class BcryptDriver {
  static hash(data: string, rounds: number = 10): Promise<string> {
    return bcrypt.hash(data, rounds);
  }

  static verify(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}

export default BcryptDriver;
