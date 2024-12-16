-- DropForeignKey
ALTER TABLE "Inverter" DROP CONSTRAINT "Inverter_connectionId_fkey";

-- AddForeignKey
ALTER TABLE "Inverter" ADD CONSTRAINT "Inverter_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "Connection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
