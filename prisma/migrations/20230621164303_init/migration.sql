-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Comment_id_seq";

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Course_id_seq";

-- AlterTable
ALTER TABLE "Lesson" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Lesson_id_seq";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "User_id_seq";
