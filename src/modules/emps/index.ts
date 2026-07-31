import { t, Elysia } from "elysia";
import { EmpModel } from "./model";
import { empService } from "./service";

export const emp = new Elysia({ prefix: "/emp" });
emp
  .post(
    "/batch",
    async ({ body }) => {
      const res = await empService.insertMany(body);
      return { success: true, data: res };
    },
    { body: EmpModel["createManyEmp"] },
  )
  .post(
    "/",
    async ({ body }) => {
      const res = await empService.insert(body);
      return { success: true, data: res };
    },
    { body: EmpModel["createEmp"] },
  )
  .get("/", async () => {
    const res = await empService.findAll();
    return { success: true, data: res };
  })
  .get(
    "/:id",
    async ({ params: { id } }) => {
      const res = await empService.findOne(id);
      return { success: true, data: res };
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
    },
  )
  .put(
    "/",
    async ({ body }) => {
      const res = await empService.update(body);
      return { success: true, data: res };
    },
    { body: EmpModel["updateEmp"] },
  )
  .delete(
    "/:id",
    async ({ params: { id }, status }) => {
      try {
        const res = await empService.delete(id);
        return { success: true, data: res };
      } catch {
        return status(404, { success: false, message: "员工不存在" });
      }
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
    },
  );
