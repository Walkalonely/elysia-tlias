// dept model
// Defines the data structure and validation for the request and response.
import { t, UnwrapSchema } from "elysia";
const createDept = t.Object({
  name: t.String(),
});
export const DeptModel = {
  createDept,
  createManyDept: t.Object({
    items: t.Array(createDept),
  }),
  updateDept: t.Object({
    id: t.Number(),
    name: t.String(),
  }),
} as const;

// Optional, cast all model to TypeScript type
export type DeptModel = {
  [k in keyof typeof DeptModel]: UnwrapSchema<(typeof DeptModel)[k]>;
};
