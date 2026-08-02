import { Elysia, status, t } from "elysia";
import { clazzService } from "./service";
import { ClazzModel } from "./model";

export const clazz = new Elysia({ prefix: "/clazz" });
clazz
  .post(
    "/batch",
    async ({ body }) => {
      const res = await clazzService.insertMany(body);
      return { success: true, data: res };
    },
    {
      body: ClazzModel["createManyClazz"],
    },
  )
  .post(
    "/",
    async ({ body }) => {
      const res = await clazzService.insert(body);
      return { success: true, data: res };
    },
    {
      body: ClazzModel["createClazz"],
    },
  )
  .put(
    "/",
    async ({ body }) => {
      const res = await clazzService.update(body);
      return { success: true, data: res };
    },
    {
      body: ClazzModel["updateClazz"],
    },
  )
  .get("/", async () => {
    const res = await clazzService.findAll();
    return { success: true, data: res };
  })
  .get(
    "/:id",
    async ({ params: { id } }) => {
      try {
        const res = await clazzService.findOne(id);
        return { success: true, data: res };
      } catch {
        return status(404, { success: false, message: "班级不存在" });
      }
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
    },
  )
  .delete(
    "/:id",
    async ({ params: { id } }) => {
      try {
        const res = await clazzService.delete(id);
        return { success: true, data: res };
      } catch {
        return status(404, { success: false, message: "班级不存在" });
      }
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
    },
  );
