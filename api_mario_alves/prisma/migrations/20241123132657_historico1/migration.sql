-- CreateTable
CREATE TABLE `_HistoricoToLivro` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_HistoricoToLivro_AB_unique`(`A`, `B`),
    INDEX `_HistoricoToLivro_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_HistoricoToLivro` ADD CONSTRAINT `_HistoricoToLivro_A_fkey` FOREIGN KEY (`A`) REFERENCES `historicos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_HistoricoToLivro` ADD CONSTRAINT `_HistoricoToLivro_B_fkey` FOREIGN KEY (`B`) REFERENCES `livros`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
