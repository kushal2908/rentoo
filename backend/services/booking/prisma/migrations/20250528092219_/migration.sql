/*
  Warnings:

  - You are about to drop the column `staus` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Booking` DROP COLUMN `staus`,
    ADD COLUMN `status` ENUM('CONFIRMED', 'CANCELLED', 'COMPLETED') NOT NULL DEFAULT 'CONFIRMED';
