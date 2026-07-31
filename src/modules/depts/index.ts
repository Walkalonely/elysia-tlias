// depts controller
import { t, Elysia } from "elysia";
import { deptService } from "./service";
import { DeptModel } from "./model";

export const dept = new Elysia({ prefix: "/dept" });
dept
  .post(
    "/batch",
    async ({ body }) => {
      const result = await deptService.insertMany(body);
      return { success: true, data: result };
    },
    { body: DeptModel["createManyDept"] },
  )
  .post(
    "/",
    async ({ body }) => {
      const result = deptService.insert(body);
      return { success: true, data: result };
    },
    { body: DeptModel["createDept"] },
  )
  .get("/", async () => {
    const result = await deptService.findAll();
    return { success: true, data: result };
  })
  .get(
    "/:id",
    async ({ params: { id } }) => {
      const result = await deptService.findOne(id);
      return { success: true, data: result };
    },
    { params: t.Object({ id: t.Number() }) },
  )
  .delete(
    "/:id",
    async ({ params: { id } }) => {
      const result = await deptService.delete(id);
      return { success: true, data: result };
    },
    { params: t.Object({ id: t.Number() }) },
  )
  .put(
    "/",
    async ({ body }) => {
      const result = await deptService.update(body);
      return { success: true, data: result };
    },
    { body: DeptModel["updateDept"] },
  );
