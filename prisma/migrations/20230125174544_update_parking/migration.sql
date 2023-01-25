-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Parking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "license_plate" TEXT NOT NULL,
    "entry_time" DATETIME NOT NULL,
    "exit_time" DATETIME,
    "time_parked_in_minutes" INTEGER,
    "value_to_pay" REAL,
    "amount_paid" REAL,
    "discount" REAL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Parking" ("amount_paid", "created_at", "discount", "entry_time", "exit_time", "id", "license_plate", "time_parked_in_minutes", "updated_at", "value_to_pay") SELECT "amount_paid", "created_at", "discount", "entry_time", "exit_time", "id", "license_plate", "time_parked_in_minutes", "updated_at", "value_to_pay" FROM "Parking";
DROP TABLE "Parking";
ALTER TABLE "new_Parking" RENAME TO "Parking";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
