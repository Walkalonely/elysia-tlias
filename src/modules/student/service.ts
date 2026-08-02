import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client";
import { StudentModel } from "./model";

class StudentService {
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
  async insertMany({ items }: StudentModel["createManyStudent"]) {
    return this.prisma.$transaction(
      items.map(({ courses, ...stuData }) => {
        return this.prisma.student.create({
          data: {
            ...stuData,
            ...(courses && {
              courses: {
                connectOrCreate: courses.map((c) => ({
                  where: { name: c.name },
                  create: { name: c.name },
                })),
              },
            }),
          },
        });
      }),
    );
  }
  async insert({ courses, ...stuData }: StudentModel["createStudent"]) {
    return this.prisma.student.create({
      data: {
        ...stuData,
        ...(courses && {
          courses: {
            connectOrCreate: courses.map((c) => ({
              where: { name: c.name },
              create: { name: c.name },
            })),
          },
        }),
      },
    });
  }
  async findAll() {
    return this.prisma.student.findMany({
      include: {
        courses: true,
      },
    });
  }
  async findByName(name: string) {
    return this.prisma.student.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      select: {
        name: true,
        no: true,
        courses: true,
      },
    });
  }
  async delete(id: number) {
    return this.prisma.student.delete({
      where: { id },
    });
  }
}
export const studentService = new StudentService();
