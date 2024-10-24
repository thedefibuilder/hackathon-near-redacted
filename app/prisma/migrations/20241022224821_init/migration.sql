/*
  Warnings:

  - You are about to alter the column `APR` on the `Investment` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Investment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "strategyId" TEXT NOT NULL,
    "chain" TEXT NOT NULL,
    "protocol" TEXT NOT NULL,
    "pool" TEXT NOT NULL,
    "APR" REAL,
    "amount" REAL NOT NULL,
    CONSTRAINT "Investment_strategyId_fkey" FOREIGN KEY ("strategyId") REFERENCES "Strategy" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Investment" ("APR", "amount", "chain", "id", "pool", "protocol", "strategyId") SELECT "APR", "amount", "chain", "id", "pool", "protocol", "strategyId" FROM "Investment";
DROP TABLE "Investment";
ALTER TABLE "new_Investment" RENAME TO "Investment";
CREATE INDEX "Investment_strategyId_idx" ON "Investment"("strategyId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
