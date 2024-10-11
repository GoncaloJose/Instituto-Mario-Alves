/*
  Warnings:

  - Added the required column `codigodoCliente` to the `reservas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reservas` ADD COLUMN `codigodoCliente` VARCHAR(191) NOT NULL;
