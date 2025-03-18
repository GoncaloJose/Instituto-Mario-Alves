-- CreateTable
CREATE TABLE `_HistoricoToReserva` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_HistoricoToReserva_AB_unique`(`A`, `B`),
    INDEX `_HistoricoToReserva_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_HistoricoToReserva` ADD CONSTRAINT `_HistoricoToReserva_A_fkey` FOREIGN KEY (`A`) REFERENCES `historicos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_HistoricoToReserva` ADD CONSTRAINT `_HistoricoToReserva_B_fkey` FOREIGN KEY (`B`) REFERENCES `reservas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
