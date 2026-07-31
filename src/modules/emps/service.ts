import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client";
import { EmpModel } from "./model";

class EmpService {
  private prisma: PrismaClient;
  constructor() {
    const pgAdapter = new PrismaPg(
      {
        connectionString: process.env.DATABASE_URL,
      },
      { schema: "app" },
    );
    this.prisma = new PrismaClient({ adapter: pgAdapter });
  }
  async insertMany({ items }: EmpModel["createManyEmp"]) {
    return this.prisma.$transaction(
      items.map(({ empExperiences, ...empData }) =>
        this.prisma.emp.create({
          data: {
            ...empData,
            empExperiences: { create: empExperiences },
          },
        }),
      ),
    );
  }
  async insert({ empExperiences, ...empData }: EmpModel["createEmp"]) {
    return this.prisma.emp.create({
      data: {
        ...empData,
        empExperiences: {
          create: empExperiences,
        },
      },
    });
  }
  async findAll() {
    return this.prisma.emp.findMany({
      include: {
        empExperiences: true,
      },
    });
  }
  async findOne(id: number) {
    return this.prisma.emp.findUnique({
      where: {
        id,
      },
      include: {
        empExperiences: true,
      },
    });
  }
  async update({ id, empExperiences, ...empData }: EmpModel["updateEmp"]) {
    return this.prisma.emp.update({
      where: { id },
      data: {
        ...empData,
        empExperiences: {
          deleteMany: {},
          create: empExperiences,
        },
      },
    });
  }
  async delete(id: number) {
    return this.prisma.emp.delete({ where: { id } });
  }
}

export const empService = new EmpService();
