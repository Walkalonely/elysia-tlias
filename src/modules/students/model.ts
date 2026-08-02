import { t, UnwrapSchema } from "elysia";
const createStudent = t.Object({
  name: t.String(),
  no: t.String(),
  courses: t.Optional(
    t.Array(
      t.Object({
        name: t.String(),
      }),
    ),
  ),
});
export const StudentModel = {
  createStudent,
  createManyStudent: t.Object({
    items: t.Array(createStudent),
  }),
  updateStudent: t.Composite([
    t.Optional(createStudent),
    t.Object({
      id: t.Number(),
    }),
  ]),
} as const;

export type StudentModel = {
  [key in keyof typeof StudentModel]: UnwrapSchema<(typeof StudentModel)[key]>;
};
