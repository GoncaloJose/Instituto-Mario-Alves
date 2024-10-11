/*
  Warnings:

  - You are about to alter the column `codigodoCliente` on the `renovacao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - You are about to alter the column `codigodoCliente` on the `reservas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - Added the required column `codigodoCliente` to the `clientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clientes` ADD COLUMN `codigodoCliente` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `renovacao` MODIFY `codigodoCliente` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `reservas` MODIFY `codigodoCliente` VARCHAR(10) NOT NULL;
