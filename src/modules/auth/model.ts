import { t, UnwrapSchema } from "elysia";

export const AuthModel = {
  UserLoginForm: t.Object({
    username: t.String(),
    password: t.String(),
  }),
  UserLoginInfo: t.Object({
    id: t.Number(),
    username: t.String(),
    name: t.String(),
    token: t.String(),
  }),
} as const;

export type AuthModel = {
  [k in keyof typeof AuthModel]: UnwrapSchema<(typeof AuthModel)[k]>;
};
