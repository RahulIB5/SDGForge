/*
  Warnings:

  - You are about to drop the column `description` on the `FIR` table. All the data in the column will be lost.
  - You are about to drop the column `evidenceUrls` on the `FIR` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `FIR` table. All the data in the column will be lost.
  - You are about to drop the column `incidentType` on the `FIR` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `FIR` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `FIR` table. All the data in the column will be lost.
  - Added the required column `complainantName` to the `FIR` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FIR" DROP COLUMN "description",
DROP COLUMN "evidenceUrls",
DROP COLUMN "fullName",
DROP COLUMN "incidentType",
DROP COLUMN "status",
DROP COLUMN "updatedAt",
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "complainantName" TEXT NOT NULL,
ADD COLUMN     "crimeType" TEXT,
ADD COLUMN     "evidenceDetails" TEXT,
ADD COLUMN     "fatherName" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "incidentDescription" TEXT,
ADD COLUMN     "incidentTime" TEXT,
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "previousComplaint" BOOLEAN,
ADD COLUMN     "previousComplaintDetails" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "urgencyLevel" TEXT,
ADD COLUMN     "witnessDetails" TEXT,
ALTER COLUMN "incidentDate" SET DATA TYPE TEXT;
