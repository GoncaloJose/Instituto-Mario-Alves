/*
  Warnings:

  - You are about to alter the column `A` on the `_clientetolivro` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `Int`.
  - The primary key for the `clientes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `codigodoCliente` on the `clientes` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `clientes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `Int`.
  - You are about to alter the column `clienteId` on the `comentarios` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `Int`.
  - You are about to alter the column `clienteId` on the `historicos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `reservaId` on the `livros` table. All the data in the column will be lost.
  - You are about to alter the column `clienteId` on the `reservas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `renovacao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_clientetolivro` DROP FOREIGN KEY `_ClienteToLivro_A_fkey`;

-- DropForeignKey
ALTER TABLE `comentarios` DROP FOREIGN KEY `comentarios_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `historicos` DROP FOREIGN KEY `historicos_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `renovacao` DROP FOREIGN KEY `renovacao_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `renovacao` DROP FOREIGN KEY `renovacao_livroId_fkey`;

-- DropForeignKey
ALTER TABLE `reservas` DROP FOREIGN KEY `reservas_clienteId_fkey`;

-- AlterTable
ALTER TABLE `_clientetolivro` MODIFY `A` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `clientes` DROP PRIMARY KEY,
    DROP COLUMN `codigodoCliente`,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `comentarios` MODIFY `clienteId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `historicos` MODIFY `clienteId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `livros` DROP COLUMN `reservaId`;

-- AlterTable
ALTER TABLE `reservas` MODIFY `clienteId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `renovacao`;

-- CreateTable
CREATE TABLE `renovacoes` (
    `id` VARCHAR(36) NOT NULL,
    `codigodoLivro` VARCHAR(191) NOT NULL,
    `datadaRenovacao` DATETIME(3) NOT NULL,
    `datadaEntrega` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `clienteId` INTEGER NOT NULL,
    `livroId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `reservas` ADD CONSTRAINT `reservas_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `renovacoes` ADD CONSTRAINT `renovacoes_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `renovacoes` ADD CONSTRAINT `renovacoes_livroId_fkey` FOREIGN KEY (`livroId`) REFERENCES `livros`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comentarios` ADD CONSTRAINT `comentarios_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historicos` ADD CONSTRAINT `historicos_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClienteToLivro` ADD CONSTRAINT `_ClienteToLivro_A_fkey` FOREIGN KEY (`A`) REFERENCES `clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
