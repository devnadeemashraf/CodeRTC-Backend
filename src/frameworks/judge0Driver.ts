import "dotenv/config";

class Judge0Driver {
  private readonly serviceEndpoint: string = "http://localhost";

  constructor() {
    if (process.env.NODE_ENV == "development") {
      this.serviceEndpoint = "http";
    } else {
      this.serviceEndpoint = process.env.RAPID_API_JUDGE0_ENDPOINT!;
    }
  }

  exec(base64String: string) {
    // Exec Code
  }

  checkStatus(token: string) {}
}

export default Judge0Driver;
