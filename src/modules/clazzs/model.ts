import { t, UnwrapSchema } from "elysia";
const createClazz = t.Object({
  name: t.String(),
  room: t.String(),
  beginDate: t.Date(),
  endDate: t.Date(),
  masterId: t.Number(),
  status: t.Number(),
});
export const ClazzModel = {
  createClazz,
  createManyClazz: t.Object({ items: t.Array(createClazz) }),
  updateClazz: t.Composite([
    t.Optional(createClazz),
    t.Object({
      id: t.Number(),
    }),
  ]),
} as const;

export type ClazzModel = {
  [k in keyof typeof ClazzModel]: UnwrapSchema<(typeof ClazzModel)[k]>;
};
