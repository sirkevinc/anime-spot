/*
  Warnings:

  - You are about to alter the column `id` on the `User` table. The data in that column will be cast from `BigInt` to `Int`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `id` on the `Anime` table. The data in that column will be cast from `BigInt` to `Int`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `id` on the `Bookmark` table. The data in that column will be cast from `BigInt` to `Int`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `locationId` on the `Bookmark` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `profileId` on the `Bookmark` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id` on the `Visited` table. The data in that column will be cast from `BigInt` to `Int`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `locationId` on the `Visited` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `profileId` on the `Visited` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `animeId` on the `Location` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id` on the `Location` table. The data in that column will be cast from `BigInt` to `Int`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `id` on the `Profile` table. The data in that column will be cast from `BigInt` to `Int`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `userId` on the `Profile` table. The data in that column will be cast from `BigInt` to `Int`. This cast may fail. Please make sure the data in the column can be cast.

*/
-- RedefineTables
CREATE TABLE "_prisma_new_User" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" STRING NOT NULL,
    "picture" STRING NOT NULL,
    "email" STRING NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
DROP INDEX "User_email_key";
DROP INDEX "User_username_key";
INSERT INTO "_prisma_new_User" ("createdAt","email","id","picture","role","username") SELECT "createdAt","email","id","picture","role","username" FROM "User";
DROP TABLE "User" CASCADE;
ALTER TABLE "_prisma_new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "_prisma_new_Anime" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "image" STRING NOT NULL,
    "name" STRING NOT NULL,
    "year" INT4 NOT NULL,
    "mal" STRING,
    "description" STRING NOT NULL,

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_Anime" ("description","id","image","mal","name","year") SELECT "description","id","image","mal","name","year" FROM "Anime";
DROP TABLE "Anime" CASCADE;
ALTER TABLE "_prisma_new_Anime" RENAME TO "Anime";
CREATE TABLE "_prisma_new_Bookmark" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "locationId" INT4 NOT NULL,
    "profileId" INT4 NOT NULL,
    "notes" STRING NOT NULL,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_Bookmark" ("id","locationId","notes","profileId") SELECT "id","locationId","notes","profileId" FROM "Bookmark";
DROP TABLE "Bookmark" CASCADE;
ALTER TABLE "_prisma_new_Bookmark" RENAME TO "Bookmark";
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
CREATE TABLE "_prisma_new_Visited" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "locationId" INT4 NOT NULL,
    "profileId" INT4 NOT NULL,
    "notes" STRING NOT NULL,

    CONSTRAINT "Visited_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_Visited" ("id","locationId","notes","profileId") SELECT "id","locationId","notes","profileId" FROM "Visited";
DROP TABLE "Visited" CASCADE;
ALTER TABLE "_prisma_new_Visited" RENAME TO "Visited";
ALTER TABLE "Visited" ADD CONSTRAINT "Visited_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
CREATE TABLE "_prisma_new_Location" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "name" STRING NOT NULL,
    "image" STRING NOT NULL,
    "description" STRING NOT NULL,
    "animeId" INT4 NOT NULL,
    "longitude" FLOAT8 NOT NULL,
    "latitude" FLOAT8 NOT NULL,
    "address" STRING NOT NULL,
    "city" STRING NOT NULL,
    "additional" STRING,
    "state" STRING NOT NULL,
    "country" STRING NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_Location" ("additional","address","animeId","city","country","description","id","image","latitude","longitude","name","state") SELECT "additional","address","animeId","city","country","description","id","image","latitude","longitude","name","state" FROM "Location";
DROP TABLE "Location" CASCADE;
ALTER TABLE "_prisma_new_Location" RENAME TO "Location";
ALTER TABLE "Location" ADD CONSTRAINT "Location_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
CREATE TABLE "_prisma_new_Profile" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "bio" STRING,
    "userId" INT4 NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);
DROP INDEX "Profile_userId_key";
INSERT INTO "_prisma_new_Profile" ("bio","id","userId") SELECT "bio","id","userId" FROM "Profile";
DROP TABLE "Profile" CASCADE;
ALTER TABLE "_prisma_new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
