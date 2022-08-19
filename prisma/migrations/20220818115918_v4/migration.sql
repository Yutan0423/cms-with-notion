-- DropIndex
DROP INDEX "UserInfo_userId_key";

-- CreateTable
CREATE TABLE "CmsSetting" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "settingKey" TEXT NOT NULL,
    "settingValue" TEXT,
    "description" TEXT,

    CONSTRAINT "CmsSetting_pkey" PRIMARY KEY ("id")
);
