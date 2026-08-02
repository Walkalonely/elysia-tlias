// depts service
import { type DeptModel } from "./model";
import { Prisma, PrismaClient } from "../../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

class DeptService {
  private prisma: PrismaClient;
  constructor() {
    const adapter = new PrismaPg(
      {
        connectionString: process.env.DATABASE_URL,
      },
      { schema: "app" },
    );
    this.prisma = new PrismaClient({ adapter });
  }
  async insert({ name }: DeptModel["createDept"]) {
    return this.prisma.dept.create({ data: { name } });
  }
  async insertMany({ items }: DeptModel["createManyDept"]) {
    return this.prisma.dept.createMany({
      data: items,
    });
  }
  async findOne(id: number) {
    return this.prisma.dept.findUnique({ where: { id } });
  }
  async findAll() {
    return this.prisma.dept.findMany();
  }
  async delete(id: number) {
    return this.prisma.dept.delete({ where: { id } });
  }
  async update({ id, name }: DeptModel["updateDept"]) {
    return this.prisma.dept.update({ where: { id }, data: { name } });
  }
}

export const deptService = new DeptService();
