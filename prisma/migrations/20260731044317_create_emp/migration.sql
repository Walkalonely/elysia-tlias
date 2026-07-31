-- CreateTable
CREATE TABLE "Emp" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '123456',
    "name" TEXT NOT NULL,
    "gender" INTEGER NOT NULL,
    "phone" CHAR(11) NOT NULL,
    "job" INTEGER,
    "salary" INTEGER,
    "image" TEXT,
    "entryDate" TIMESTAMP(3),
    "deptId" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Emp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmpExperience" (
    "id" SERIAL NOT NULL,
    "empId" INTEGER NOT NULL,
    "beginDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "company" TEXT NOT NULL,
    "job" TEXT NOT NULL,

    CONSTRAINT "EmpExperience_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Emp_username_key" ON "Emp"("username");

-- AddForeignKey
ALTER TABLE "Emp" ADD CONSTRAINT "Emp_deptId_fkey" FOREIGN KEY ("deptId") REFERENCES "Dept"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmpExperience" ADD CONSTRAINT "EmpExperience_empId_fkey" FOREIGN KEY ("empId") REFERENCES "Emp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
