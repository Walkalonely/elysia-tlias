/*
  Warnings:

  - A unique constraint covering the columns `[no]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Student_no_key" ON "Student"("no");
