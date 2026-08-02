import { Elysia, status, t } from "elysia";
import { StudentModel } from "./model";
import { studentService } from "./service";
import { Prisma } from "../../../generated/prisma/client";

export const student = new Elysia({ prefix: "/student" });
student
  .post(
    "/batch",
    async ({ body }) => {
      const res = studentService.insertMany(body);
      return { success: true, data: res };
    },
    {
      body: StudentModel["createManyStudent"],
    },
  )
  .post(
    "/",
    async ({ body }) => {
      try {
        const res = await studentService.insert(body);
        return { success: true, data: res };
      } catch (e) {
        if (
          e instanceof Prisma.PrismaClientKnownRequestError &&
          e.code === "P2002"
        ) {
          return status(409, {
            success: false,
            message: `学号：${body.no}已存在`,
          });
        }
      }
    },
    {
      body: StudentModel["createStudent"],
    },
  )
  .get("/", async () => {
    const res = await studentService.findAll();
    return { success: true, data: res };
  })
  .get(
    "/name",
    async ({ query: { name } }) => {
      const res = await studentService.findByName(name);
      return { success: true, data: res };
    },
    {
      query: t.Object({
        name: t.String(),
      }),
    },
  )
  .delete(
    "/:id",
    async ({ params: { id } }) => {
      const res = await studentService.delete(id);
      return { success: true, data: res };
    },
    { params: t.Object({ id: t.Number() }) },
  );
