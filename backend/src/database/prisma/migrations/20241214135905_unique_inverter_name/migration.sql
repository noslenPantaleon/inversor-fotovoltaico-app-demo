/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Connection` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Inverter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Connection_name_key" ON "Connection"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Inverter_name_key" ON "Inverter"("name");
