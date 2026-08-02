import { Elysia } from "elysia";
import { AuthModel } from "./model";
import { authService } from "./service";
export const auth = new Elysia({ prefix: "/auth" });
auth
  .post(
    "/login",
    async ({ body, cookie, status }) => {
      const res = await authService.findByUsernameAndPassword(body);
      if (!res) {
        return status(401, { success: false, message: "用户名或密码错误" });
      }

      return { success: true, data: { ...res, token: "jwt1" } };
    },
    { body: AuthModel["UserLoginForm"] },
  )
  .get("/login", ({ cookie }) => {
    cookie.token.set({ value: "abc123", maxAge: 60 * 60 * 24 });
    return { success: true };
  })
  .get("/user", ({ cookie }) => {
    const token = cookie.token.value;
    return {
      token,
    };
  });
