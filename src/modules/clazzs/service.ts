import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client";
import { ClazzModel } from "./model";
class ClazzService {
  private prisma: PrismaClient;
  constructor() {
    const pgAdapter = new PrismaPg(
      {
        connectionString: process.env.DATABASE_URL,
      },
      {
        schema: "app",
      },
    );
    this.prisma = new PrismaClient({ adapter: pgAdapter });
  }
  async insert(body: ClazzModel["createClazz"]) {
    return this.prisma.clazz.create({ data: body });
  }
  async insertMany({ items }: ClazzModel["createManyClazz"]) {
    return this.prisma.clazz.createMany({ data: items });
  }
  async update({ id, ...clazzData }: ClazzModel["updateClazz"]) {
    return this.prisma.clazz.update({
      data: { ...clazzData },
      where: {
        id,
      },
    });
  }
  async findAll() {
    return this.prisma.clazz.findMany();
  }
  async findOne(id: number) {
    return this.prisma.clazz.findUnique({ where: { id } });
  }
  async delete(id: number) {
    return this.prisma.clazz.delete({ where: { id } });
  }
}

export const clazzService = new ClazzService();