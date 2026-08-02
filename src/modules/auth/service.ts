import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client";
import { AuthModel } from "./model";

class AuthService {
  private prisma: PrismaClient;
  constructor() {
    const adapter = new PrismaPg(
      {
        connectionString: process.env.DATABASE_URL,
      },
      { schema: "app" },
    );
    this.prisma = new PrismaClient({ adapter: adapter });
  }
  async findByUsernameAndPassword(
    body: AuthModel["UserLoginForm"],
  ): Promise<AuthModel["UserLoginInfo"] | null> {
    const emp = await this.prisma.emp.findUnique({
      where: {
        username: body.username,
        password: body.password,
      },
    });
    if (!emp) {
      return null;
    }
    const token = "jwt";
    return { username: emp.username, id: emp.id, name: emp.name };
  }
}

export const authService = new AuthService();
