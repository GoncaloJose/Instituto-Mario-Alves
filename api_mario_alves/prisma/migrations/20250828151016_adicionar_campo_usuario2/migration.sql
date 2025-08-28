/*
  Warnings:

  - You are about to alter the column `escolaridade` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `VarChar(60)` to `Enum(EnumId(0))`.
  - You are about to alter the column `instituicao` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(60)`.

*/
-- AlterTable
ALTER TABLE `usuarios` MODIFY `escolaridade` ENUM('ENSINO_MEDIO', 'ENSINO_SUPERIOR', 'POS_GRADUACAO', 'MESTRADO', 'DOUTORADO', 'OUTRO') NOT NULL DEFAULT 'OUTRO',
    MODIFY `instituicao` VARCHAR(60) NOT NULL;
