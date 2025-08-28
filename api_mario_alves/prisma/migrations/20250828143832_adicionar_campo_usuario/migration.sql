/*
  Warnings:

  - Added the required column `escolaridade` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `escolaridade` VARCHAR(60) NOT NULL,
    ADD COLUMN `instituicao` ENUM('ENSINO_MEDIO', 'ENSINO_SUPERIOR', 'POS_GRADUACAO', 'MESTRADO', 'DOUTORADO', 'OUTRO') NOT NULL DEFAULT 'OUTRO',
    ADD COLUMN `telefone` VARCHAR(15) NOT NULL;
