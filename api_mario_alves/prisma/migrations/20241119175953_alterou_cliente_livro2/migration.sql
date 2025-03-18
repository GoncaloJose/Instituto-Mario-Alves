/*
  Warnings:

  - You are about to drop the `_clientetoreserva` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_livrotoreserva` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clienteId` to the `reservas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `livroId` to the `reservas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_clientetoreserva` DROP FOREIGN KEY `_ClienteToReserva_A_fkey`;

-- DropForeignKey
ALTER TABLE `_clientetoreserva` DROP FOREIGN KEY `_ClienteToReserva_B_fkey`;

-- DropForeignKey
ALTER TABLE `_livrotoreserva` DROP FOREIGN KEY `_LivroToReserva_A_fkey`;

-- DropForeignKey
ALTER TABLE `_livrotoreserva` DROP FOREIGN KEY `_LivroToReserva_B_fkey`;

-- AlterTable
ALTER TABLE `reservas` ADD COLUMN `clienteId` INTEGER NOT NULL,
    ADD COLUMN `livroId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_clientetoreserva`;

-- DropTable
DROP TABLE `_livrotoreserva`;

-- AddForeignKey
ALTER TABLE `reservas` ADD CONSTRAINT `reservas_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservas` ADD CONSTRAINT `reservas_livroId_fkey` FOREIGN KEY (`livroId`) REFERENCES `livros`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
