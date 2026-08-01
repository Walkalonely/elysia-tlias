-- CreateTable
CREATE TABLE "Clazz" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "room" TEXT,
    "beginDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "masterId" INTEGER,
    "status" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clazz_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clazz_name_key" ON "Clazz"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Clazz_masterId_key" ON "Clazz"("masterId");

-- AddForeignKey
ALTER TABLE "Clazz" ADD CONSTRAINT "Clazz_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Emp"("id") ON DELETE SET NULL ON UPDATE CASCADE;
