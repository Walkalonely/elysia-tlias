import { t, Elysia } from "elysia";
import { dept } from "./modules/dept";
import { emp } from "./modules/emp";
import { clazz } from "./modules/clazz";
import { student } from "./modules/student";
import { auth } from "./modules/auth";
const app = new Elysia()
  .use(dept)
  .use(emp)
  .use(clazz)
  .use(student)
  .use(auth)
  .get("/", ({ redirect }) => {
    return redirect("https://chatgpt.com");
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
