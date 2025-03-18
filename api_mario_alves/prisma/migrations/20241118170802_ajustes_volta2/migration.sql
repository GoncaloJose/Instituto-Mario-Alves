/*
  Warnings:

  - The primary key for the `clientes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `reservaId` on the `livros` table. All the data in the column will be lost.
  - You are about to drop the `_clientetocomentario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_clientetohistorico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_clientetoreserva` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `codigodoCliente` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clienteId` to the `comentarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clienteId` to the `historicos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigodoLivro` to the `livros` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clienteId` to the `reservas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_clientetocomentario` DROP FOREIGN KEY `_ClienteToComentario_A_fkey`;

-- DropForeignKey
ALTER TABLE `_clientetocomentario` DROP FOREIGN KEY `_ClienteToComentario_B_fkey`;

-- DropForeignKey
ALTER TABLE `_clientetohistorico` DROP FOREIGN KEY `_ClienteToHistorico_A_fkey`;

-- DropForeignKey
ALTER TABLE `_clientetohistorico` DROP FOREIGN KEY `_ClienteToHistorico_B_fkey`;

-- DropForeignKey
ALTER TABLE `_clientetolivro` DROP FOREIGN KEY `_ClienteToLivro_A_fkey`;

-- DropForeignKey
ALTER TABLE `_clientetoreserva` DROP FOREIGN KEY `_ClienteToReserva_A_fkey`;

-- DropForeignKey
ALTER TABLE `_clientetoreserva` DROP FOREIGN KEY `_ClienteToReserva_B_fkey`;

-- AlterTable
ALTER TABLE `_clientetolivro` MODIFY `A` VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `clientes` DROP PRIMARY KEY,
    ADD COLUMN `codigodoCliente` VARCHAR(10) NOT NULL,
    MODIFY `id` VARCHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `comentarios` ADD COLUMN `clienteId` VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `historicos` ADD COLUMN `clienteId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `livros` DROP COLUMN `reservaId`,
    ADD COLUMN `codigodoLivro` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `reservas` ADD COLUMN `clienteId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_clientetocomentario`;

-- DropTable
DROP TABLE `_clientetohistorico`;

-- DropTable
DROP TABLE `_clientetoreserva`;

-- CreateTable
CREATE TABLE `renovacao` (
    `id` VARCHAR(36) NOT NULL,
    `codigodoCliente` VARCHAR(10) NOT NULL,
    `codigodoLivro` VARCHAR(191) NOT NULL,
    `datadaRenovacao` DATETIME(3) NOT NULL,
    `datadaEntrega` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `clienteId` VARCHAR(191) NOT NULL,
    `livroId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `reservas` ADD CONSTRAINT `reservas_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `renovacao` ADD CONSTRAINT `renovacao_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `renovacao` ADD CONSTRAINT `renovacao_livroId_fkey` FOREIGN KEY (`livroId`) REFERENCES `livros`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comentarios` ADD CONSTRAINT `comentarios_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historicos` ADD CONSTRAINT `historicos_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClienteToLivro` ADD CONSTRAINT `_ClienteToLivro_A_fkey` FOREIGN KEY (`A`) REFERENCES `clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
