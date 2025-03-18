/*
  Warnings:

  - You are about to alter the column `A` on the `_clientetolivro` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `Int`.
  - The primary key for the `clientes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `codigodoCliente` on the `clientes` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `clientes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `Int`.
  - You are about to drop the column `clienteId` on the `comentarios` table. All the data in the column will be lost.
  - You are about to drop the column `clienteId` on the `historicos` table. All the data in the column will be lost.
  - You are about to drop the column `codigodoLivro` on the `livros` table. All the data in the column will be lost.
  - You are about to drop the column `clienteId` on the `reservas` table. All the data in the column will be lost.
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
ALTER TABLE `comentarios` DROP COLUMN `clienteId`;

-- AlterTable
ALTER TABLE `historicos` DROP COLUMN `clienteId`;

-- AlterTable
ALTER TABLE `livros` DROP COLUMN `codigodoLivro`;

-- AlterTable
ALTER TABLE `reservas` DROP COLUMN `clienteId`;

-- DropTable
DROP TABLE `renovacao`;

-- CreateTable
CREATE TABLE `_ClienteToReserva` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ClienteToReserva_AB_unique`(`A`, `B`),
    INDEX `_ClienteToReserva_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ClienteToComentario` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ClienteToComentario_AB_unique`(`A`, `B`),
    INDEX `_ClienteToComentario_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ClienteToHistorico` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ClienteToHistorico_AB_unique`(`A`, `B`),
    INDEX `_ClienteToHistorico_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ClienteToLivro` ADD CONSTRAINT `_ClienteToLivro_A_fkey` FOREIGN KEY (`A`) REFERENCES `clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClienteToReserva` ADD CONSTRAINT `_ClienteToReserva_A_fkey` FOREIGN KEY (`A`) REFERENCES `clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClienteToReserva` ADD CONSTRAINT `_ClienteToReserva_B_fkey` FOREIGN KEY (`B`) REFERENCES `reservas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClienteToComentario` ADD CONSTRAINT `_ClienteToComentario_A_fkey` FOREIGN KEY (`A`) REFERENCES `clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClienteToComentario` ADD CONSTRAINT `_ClienteToComentario_B_fkey` FOREIGN KEY (`B`) REFERENCES `comentarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClienteToHistorico` ADD CONSTRAINT `_ClienteToHistorico_A_fkey` FOREIGN KEY (`A`) REFERENCES `clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClienteToHistorico` ADD CONSTRAINT `_ClienteToHistorico_B_fkey` FOREIGN KEY (`B`) REFERENCES `historicos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
