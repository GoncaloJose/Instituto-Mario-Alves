/*
  Warnings:

  - You are about to drop the column `codigodoCliente` on the `reservas` table. All the data in the column will be lost.
  - You are about to drop the column `codigodoLivro` on the `reservas` table. All the data in the column will be lost.
  - You are about to drop the column `datadaEntrega` on the `reservas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `reservas` DROP COLUMN `codigodoCliente`,
    DROP COLUMN `codigodoLivro`,
    DROP COLUMN `datadaEntrega`;
