/*
  Warnings:

  - You are about to drop the column `clienteId` on the `comentarios` table. All the data in the column will be lost.
  - You are about to drop the column `clienteId` on the `historicos` table. All the data in the column will be lost.
  - You are about to drop the column `clienteId` on the `renovacoes` table. All the data in the column will be lost.
  - You are about to drop the column `clienteId` on the `reservas` table. All the data in the column will be lost.
  - You are about to drop the `_admintolivro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_cadastrotocliente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_clientetolivro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `admins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cadastros` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clientes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fotos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `usuarioId` to the `comentarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `historicos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `renovacoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `reservas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_admintolivro` DROP FOREIGN KEY `_AdminToLivro_A_fkey`;

-- DropForeignKey
ALTER TABLE `_admintolivro` DROP FOREIGN KEY `_AdminToLivro_B_fkey`;

-- DropForeignKey
ALTER TABLE `_cadastrotocliente` DROP FOREIGN KEY `_CadastroToCliente_A_fkey`;

-- DropForeignKey
ALTER TABLE `_cadastrotocliente` DROP FOREIGN KEY `_CadastroToCliente_B_fkey`;

-- DropForeignKey
ALTER TABLE `_clientetolivro` DROP FOREIGN KEY `_ClienteToLivro_A_fkey`;

-- DropForeignKey
ALTER TABLE `_clientetolivro` DROP FOREIGN KEY `_ClienteToLivro_B_fkey`;

-- DropForeignKey
ALTER TABLE `comentarios` DROP FOREIGN KEY `comentarios_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `fotos` DROP FOREIGN KEY `fotos_livroId_fkey`;

-- DropForeignKey
ALTER TABLE `historicos` DROP FOREIGN KEY `historicos_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `renovacoes` DROP FOREIGN KEY `renovacoes_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `reservas` DROP FOREIGN KEY `reservas_clienteId_fkey`;

-- AlterTable
ALTER TABLE `comentarios` DROP COLUMN `clienteId`,
    ADD COLUMN `usuarioId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `historicos` DROP COLUMN `clienteId`,
    ADD COLUMN `usuarioId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `renovacoes` DROP COLUMN `clienteId`,
    ADD COLUMN `usuarioId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `reservas` DROP COLUMN `clienteId`,
    ADD COLUMN `usuarioId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_admintolivro`;

-- DropTable
DROP TABLE `_cadastrotocliente`;

-- DropTable
DROP TABLE `_clientetolivro`;

-- DropTable
DROP TABLE `admins`;

-- DropTable
DROP TABLE `cadastros`;

-- DropTable
DROP TABLE `clientes`;

-- DropTable
DROP TABLE `fotos`;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(60) NOT NULL,
    `email` VARCHAR(60) NOT NULL,
    `senha` VARCHAR(60) NOT NULL,
    `admin` VARCHAR(60) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `usuarios_email_key`(`email`),
    UNIQUE INDEX `usuarios_admin_key`(`admin`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_LivroToUsuario` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_LivroToUsuario_AB_unique`(`A`, `B`),
    INDEX `_LivroToUsuario_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `reservas` ADD CONSTRAINT `reservas_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `renovacoes` ADD CONSTRAINT `renovacoes_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comentarios` ADD CONSTRAINT `comentarios_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historicos` ADD CONSTRAINT `historicos_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LivroToUsuario` ADD CONSTRAINT `_LivroToUsuario_A_fkey` FOREIGN KEY (`A`) REFERENCES `livros`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LivroToUsuario` ADD CONSTRAINT `_LivroToUsuario_B_fkey` FOREIGN KEY (`B`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
