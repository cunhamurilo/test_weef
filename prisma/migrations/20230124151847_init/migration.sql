-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Parking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "license_plate" TEXT NOT NULL,
    "entry_time" DATETIME NOT NULL,
    "exit_time" DATETIME NOT NULL,
    "time_parked_in_minutes" INTEGER NOT NULL,
    "value_to_pay" REAL NOT NULL,
    "amount_paid" REAL NOT NULL,
    "discount" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
