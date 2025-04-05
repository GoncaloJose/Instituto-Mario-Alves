/*
  Warnings:

  - You are about to drop the column `autor` on the `livros` table. All the data in the column will be lost.
  - You are about to drop the column `genero` on the `livros` table. All the data in the column will be lost.
  - You are about to drop the column `secao` on the `livros` table. All the data in the column will be lost.
  - You are about to drop the column `sinopse` on the `livros` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `livros` DROP COLUMN `autor`,
    DROP COLUMN `genero`,
    DROP COLUMN `secao`,
    DROP COLUMN `sinopse`;

-- CreateTable
CREATE TABLE `autores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `pais` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `generos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `editoras` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NULL,
    `ano` VARCHAR(191) NOT NULL,
    `edicao` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AutorToUsuario` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AutorToUsuario_AB_unique`(`A`, `B`),
    INDEX `_AutorToUsuario_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AutorToReserva` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AutorToReserva_AB_unique`(`A`, `B`),
    INDEX `_AutorToReserva_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AutorToRenovacao` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AutorToRenovacao_AB_unique`(`A`, `B`),
    INDEX `_AutorToRenovacao_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AutorToComentario` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AutorToComentario_AB_unique`(`A`, `B`),
    INDEX `_AutorToComentario_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AutorToEmprestimo` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AutorToEmprestimo_AB_unique`(`A`, `B`),
    INDEX `_AutorToEmprestimo_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AutorToLivro` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AutorToLivro_AB_unique`(`A`, `B`),
    INDEX `_AutorToLivro_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AutorToGenero` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AutorToGenero_AB_unique`(`A`, `B`),
    INDEX `_AutorToGenero_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AutorToEditora` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AutorToEditora_AB_unique`(`A`, `B`),
    INDEX `_AutorToEditora_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GeneroToUsuario` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GeneroToUsuario_AB_unique`(`A`, `B`),
    INDEX `_GeneroToUsuario_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GeneroToReserva` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GeneroToReserva_AB_unique`(`A`, `B`),
    INDEX `_GeneroToReserva_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GeneroToRenovacao` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GeneroToRenovacao_AB_unique`(`A`, `B`),
    INDEX `_GeneroToRenovacao_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GeneroToLivro` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GeneroToLivro_AB_unique`(`A`, `B`),
    INDEX `_GeneroToLivro_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EditoraToUsuario` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EditoraToUsuario_AB_unique`(`A`, `B`),
    INDEX `_EditoraToUsuario_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EditoraToReserva` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EditoraToReserva_AB_unique`(`A`, `B`),
    INDEX `_EditoraToReserva_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EditoraToRenovacao` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EditoraToRenovacao_AB_unique`(`A`, `B`),
    INDEX `_EditoraToRenovacao_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EditoraToEmprestimo` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EditoraToEmprestimo_AB_unique`(`A`, `B`),
    INDEX `_EditoraToEmprestimo_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EditoraToGenero` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EditoraToGenero_AB_unique`(`A`, `B`),
    INDEX `_EditoraToGenero_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EditoraToLivro` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EditoraToLivro_AB_unique`(`A`, `B`),
    INDEX `_EditoraToLivro_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ComentarioToGenero` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ComentarioToGenero_AB_unique`(`A`, `B`),
    INDEX `_ComentarioToGenero_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ComentarioToEditora` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ComentarioToEditora_AB_unique`(`A`, `B`),
    INDEX `_ComentarioToEditora_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EmprestimoToGenero` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EmprestimoToGenero_AB_unique`(`A`, `B`),
    INDEX `_EmprestimoToGenero_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AutorToUsuario` ADD CONSTRAINT `_AutorToUsuario_A_fkey` FOREIGN KEY (`A`) REFERENCES `autores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AutorToUsuario` ADD CONSTRAINT `_AutorToUsuario_B_fkey` FOREIGN KEY (`B`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AutorToReserva` ADD CONSTRAINT `_AutorToReserva_A_fkey` FOREIGN KEY (`A`) REFERENCES `autores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AutorToReserva` ADD CONSTRAINT `_AutorToReserva_B_fkey` FOREIGN KEY (`B`) REFERENCES `reservas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AutorToRenovacao` ADD CONSTRAINT `_AutorToRenovacao_A_fkey` FOREIGN KEY (`A`) REFERENCES `autores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AutorToRenovacao` ADD CONSTRAINT `_AutorToRenovacao_B_fkey` FOREIGN KEY (`B`) REFERENCES `renovacoes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AutorToComentario` ADD CONSTRAINT `_AutorToComentario_A_fkey` FOREIGN KEY (`A`) REFERENCES `autores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AutorToComentario` ADD CONSTRAINT `_AutorToComentario_B_fkey` FOREIGN KEY (`B`) REFERENCES `comentarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AutorToEmprestimo` ADD CONSTRAINT `_AutorToEmprestimo_A_fkey` FOREIGN KEY (`A`) REFERENCES `autores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AutorToEmprestimo` ADD CONSTRAINT `_AutorToEmprestimo_B_fkey` FOREIGN KEY (`B`) REFERENCES `emprestimos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AutorToLivro` ADD CONSTRAINT `_AutorToLivro_A_fkey` FOREIGN KEY (`A`) REFERENCES `autores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AutorToLivro` ADD CONSTRAINT `_AutorToLivro_B_fkey` FOREIGN KEY (`B`) REFERENCES `livros`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AutorToGenero` ADD CONSTRAINT `_AutorToGenero_A_fkey` FOREIGN KEY (`A`) REFERENCES `autores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AutorToGenero` ADD CONSTRAINT `_AutorToGenero_B_fkey` FOREIGN KEY (`B`) REFERENCES `generos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AutorToEditora` ADD CONSTRAINT `_AutorToEditora_A_fkey` FOREIGN KEY (`A`) REFERENCES `autores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AutorToEditora` ADD CONSTRAINT `_AutorToEditora_B_fkey` FOREIGN KEY (`B`) REFERENCES `editoras`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GeneroToUsuario` ADD CONSTRAINT `_GeneroToUsuario_A_fkey` FOREIGN KEY (`A`) REFERENCES `generos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GeneroToUsuario` ADD CONSTRAINT `_GeneroToUsuario_B_fkey` FOREIGN KEY (`B`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GeneroToReserva` ADD CONSTRAINT `_GeneroToReserva_A_fkey` FOREIGN KEY (`A`) REFERENCES `generos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GeneroToReserva` ADD CONSTRAINT `_GeneroToReserva_B_fkey` FOREIGN KEY (`B`) REFERENCES `reservas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GeneroToRenovacao` ADD CONSTRAINT `_GeneroToRenovacao_A_fkey` FOREIGN KEY (`A`) REFERENCES `generos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GeneroToRenovacao` ADD CONSTRAINT `_GeneroToRenovacao_B_fkey` FOREIGN KEY (`B`) REFERENCES `renovacoes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GeneroToLivro` ADD CONSTRAINT `_GeneroToLivro_A_fkey` FOREIGN KEY (`A`) REFERENCES `generos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GeneroToLivro` ADD CONSTRAINT `_GeneroToLivro_B_fkey` FOREIGN KEY (`B`) REFERENCES `livros`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EditoraToUsuario` ADD CONSTRAINT `_EditoraToUsuario_A_fkey` FOREIGN KEY (`A`) REFERENCES `editoras`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EditoraToUsuario` ADD CONSTRAINT `_EditoraToUsuario_B_fkey` FOREIGN KEY (`B`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EditoraToReserva` ADD CONSTRAINT `_EditoraToReserva_A_fkey` FOREIGN KEY (`A`) REFERENCES `editoras`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EditoraToReserva` ADD CONSTRAINT `_EditoraToReserva_B_fkey` FOREIGN KEY (`B`) REFERENCES `reservas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EditoraToRenovacao` ADD CONSTRAINT `_EditoraToRenovacao_A_fkey` FOREIGN KEY (`A`) REFERENCES `editoras`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EditoraToRenovacao` ADD CONSTRAINT `_EditoraToRenovacao_B_fkey` FOREIGN KEY (`B`) REFERENCES `renovacoes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EditoraToEmprestimo` ADD CONSTRAINT `_EditoraToEmprestimo_A_fkey` FOREIGN KEY (`A`) REFERENCES `editoras`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EditoraToEmprestimo` ADD CONSTRAINT `_EditoraToEmprestimo_B_fkey` FOREIGN KEY (`B`) REFERENCES `emprestimos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EditoraToGenero` ADD CONSTRAINT `_EditoraToGenero_A_fkey` FOREIGN KEY (`A`) REFERENCES `editoras`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EditoraToGenero` ADD CONSTRAINT `_EditoraToGenero_B_fkey` FOREIGN KEY (`B`) REFERENCES `generos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EditoraToLivro` ADD CONSTRAINT `_EditoraToLivro_A_fkey` FOREIGN KEY (`A`) REFERENCES `editoras`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EditoraToLivro` ADD CONSTRAINT `_EditoraToLivro_B_fkey` FOREIGN KEY (`B`) REFERENCES `livros`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ComentarioToGenero` ADD CONSTRAINT `_ComentarioToGenero_A_fkey` FOREIGN KEY (`A`) REFERENCES `comentarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ComentarioToGenero` ADD CONSTRAINT `_ComentarioToGenero_B_fkey` FOREIGN KEY (`B`) REFERENCES `generos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ComentarioToEditora` ADD CONSTRAINT `_ComentarioToEditora_A_fkey` FOREIGN KEY (`A`) REFERENCES `comentarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ComentarioToEditora` ADD CONSTRAINT `_ComentarioToEditora_B_fkey` FOREIGN KEY (`B`) REFERENCES `editoras`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmprestimoToGenero` ADD CONSTRAINT `_EmprestimoToGenero_A_fkey` FOREIGN KEY (`A`) REFERENCES `emprestimos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmprestimoToGenero` ADD CONSTRAINT `_EmprestimoToGenero_B_fkey` FOREIGN KEY (`B`) REFERENCES `generos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
