import { Elysia } from "elysia";
import { AuthModel } from "./model";
import { authService } from "./service";
export const auth = new Elysia({ prefix: "/auth" });
auth.post(
  "/login",
  async ({ body, status }) => {
    const res = await authService.findByUsernameAndPassword(body);
    if (!res) {
      return status(401, { success: false, message: "用户名或密码错误" });
    }
    return { success: true, data: res };
  },
  { body: AuthModel["UserLoginForm"] },
);
