import { t, Elysia } from "elysia";
import { dept } from "./modules/depts";
import { emp } from "./modules/emps";
import { clazz } from "./modules/clazzs";
const app = new Elysia()
  .use(dept)
  .use(emp)
  .use(clazz)
  .get("/", ({ query }) => {
    return query;
  })
  .get("/test/:id", ({ params: { id } }) => ({ id, type: typeof id }), {
    params: t.Object({
      id: t.Number(),
    }),
  })
  .post("/", ({ body }) => ({ success: true, data: body }), {
    body: t.Object({
      name: t.String(),
      age: t.Number(),
      email: t.String({ format: "email" }),
    }),
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
