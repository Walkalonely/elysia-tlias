import { t, UnwrapSchema } from "elysia";
const createEmp = t.Object({
  username: t.String(),
  password: t.String(),
  name: t.String(),
  gender: t.Number(),
  phone: t.String({ minLength: 11, maxLength: 11 }),
  job: t.Optional(t.Number()),
  salary: t.Optional(t.Number()),
  image: t.Optional(t.String()),
  entryDate: t.Optional(t.Date()),
  deptId: t.Number(),
  empExperiences: t.Optional(
    t.Array(
      t.Object({
        beginDate: t.Date(),
        endDate: t.Date(),
        company: t.String(),
        job: t.String(),
      }),
    ),
  ),
});
const updateEmp = t.Composite([
  t.Object({ id: t.Number() }),
  t.Partial(createEmp),
]);
export const EmpModel = {
  createEmp,
  updateEmp,
  createManyEmp: t.Object({
    items: t.Array(createEmp),
  }),
} as const;

export type EmpModel = {
  [k in keyof typeof EmpModel]: UnwrapSchema<(typeof EmpModel)[k]>;
};
