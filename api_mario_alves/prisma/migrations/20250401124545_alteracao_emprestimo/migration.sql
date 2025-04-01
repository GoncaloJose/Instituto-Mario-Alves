/*
  Warnings:

  - You are about to alter the column `admin` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `VarChar(60)` to `TinyInt`.
  - You are about to drop the `_historicotorenovacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_historicotoreserva` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `historicos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_historicotorenovacao` DROP FOREIGN KEY `_HistoricoToRenovacao_A_fkey`;

-- DropForeignKey
ALTER TABLE `_historicotorenovacao` DROP FOREIGN KEY `_HistoricoToRenovacao_B_fkey`;

-- DropForeignKey
ALTER TABLE `_historicotoreserva` DROP FOREIGN KEY `_HistoricoToReserva_A_fkey`;

-- DropForeignKey
ALTER TABLE `_historicotoreserva` DROP FOREIGN KEY `_HistoricoToReserva_B_fkey`;

-- DropForeignKey
ALTER TABLE `historicos` DROP FOREIGN KEY `historicos_livroId_fkey`;

-- DropForeignKey
ALTER TABLE `historicos` DROP FOREIGN KEY `historicos_usuarioId_fkey`;

-- DropIndex
DROP INDEX `usuarios_admin_key` ON `usuarios`;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `admin` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `_historicotorenovacao`;

-- DropTable
DROP TABLE `_historicotoreserva`;

-- DropTable
DROP TABLE `historicos`;

-- CreateTable
CREATE TABLE `emprestimos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `datadaReserva` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `datadaEntrega` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `usuarioId` INTEGER NOT NULL,
    `livroId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EmprestimoToReserva` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EmprestimoToReserva_AB_unique`(`A`, `B`),
    INDEX `_EmprestimoToReserva_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EmprestimoToRenovacao` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EmprestimoToRenovacao_AB_unique`(`A`, `B`),
    INDEX `_EmprestimoToRenovacao_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `emprestimos` ADD CONSTRAINT `emprestimos_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `emprestimos` ADD CONSTRAINT `emprestimos_livroId_fkey` FOREIGN KEY (`livroId`) REFERENCES `livros`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmprestimoToReserva` ADD CONSTRAINT `_EmprestimoToReserva_A_fkey` FOREIGN KEY (`A`) REFERENCES `emprestimos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmprestimoToReserva` ADD CONSTRAINT `_EmprestimoToReserva_B_fkey` FOREIGN KEY (`B`) REFERENCES `reservas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmprestimoToRenovacao` ADD CONSTRAINT `_EmprestimoToRenovacao_A_fkey` FOREIGN KEY (`A`) REFERENCES `emprestimos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmprestimoToRenovacao` ADD CONSTRAINT `_EmprestimoToRenovacao_B_fkey` FOREIGN KEY (`B`) REFERENCES `renovacoes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
