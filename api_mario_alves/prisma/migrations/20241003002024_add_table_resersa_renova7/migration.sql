/*
  Warnings:

  - You are about to alter the column `datadaRenovacao` on the `renovacao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10)` to `DateTime(3)`.
  - You are about to alter the column `datadaEntrega` on the `renovacao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10)` to `DateTime(3)`.
  - You are about to alter the column `datadaReserva` on the `reservas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10)` to `DateTime(3)`.
  - You are about to alter the column `datadaEntrega` on the `reservas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `renovacao` MODIFY `datadaRenovacao` DATETIME(3) NOT NULL,
    MODIFY `datadaEntrega` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `reservas` MODIFY `datadaReserva` DATETIME(3) NOT NULL,
    MODIFY `datadaEntrega` DATETIME(3) NOT NULL;
