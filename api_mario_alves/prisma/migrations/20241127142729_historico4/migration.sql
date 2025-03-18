-- CreateTable
CREATE TABLE `_HistoricoToRenovacao` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_HistoricoToRenovacao_AB_unique`(`A`, `B`),
    INDEX `_HistoricoToRenovacao_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_HistoricoToRenovacao` ADD CONSTRAINT `_HistoricoToRenovacao_A_fkey` FOREIGN KEY (`A`) REFERENCES `historicos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_HistoricoToRenovacao` ADD CONSTRAINT `_HistoricoToRenovacao_B_fkey` FOREIGN KEY (`B`) REFERENCES `renovacoes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
