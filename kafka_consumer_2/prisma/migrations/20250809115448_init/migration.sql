-- CreateEnum
CREATE TYPE "public"."statusenum" AS ENUM ('NOT_STARTED', 'PENDING', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "public"."GroupMessages" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "message" VARCHAR NOT NULL,
    "fileLink" VARCHAR,
    "senderId" INTEGER NOT NULL,
    "timeStamp" VARCHAR NOT NULL,

    CONSTRAINT "GroupMessages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."IndividualMessage" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "channelId" VARCHAR NOT NULL,
    "senderId" INTEGER NOT NULL,
    "message" VARCHAR,
    "Link" VARCHAR,
    "isDeleted" BOOLEAN,
    "timeStamp" VARCHAR NOT NULL,

    CONSTRAINT "IndividualMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."IndividualMessageStatus" (
    "id" SERIAL NOT NULL,
    "messageId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "isMessageSeen" BOOLEAN,
    "isReceived" BOOLEAN,
    "isDelevered" BOOLEAN,
    "timeStamp" VARCHAR NOT NULL,

    CONSTRAINT "IndividualMessageStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProjectMembers" (
    "id" SERIAL NOT NULL,
    "phonenumber" VARCHAR NOT NULL,
    "projectId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ProjectMembers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Projects" (
    "id" SERIAL NOT NULL,
    "projectName" VARCHAR NOT NULL,
    "managerId" INTEGER NOT NULL,
    "projectDiscription" VARCHAR NOT NULL,
    "projectStatus" "public"."statusenum" NOT NULL,
    "projectStartDate" VARCHAR NOT NULL,
    "projectEndDate" VARCHAR NOT NULL,
    "isFeedBackeOpen" BOOLEAN,
    "isDeleted" BOOLEAN,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserFeedBack" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER,
    "message" VARCHAR NOT NULL,
    "rating" INTEGER NOT NULL,
    "senderId" INTEGER NOT NULL,
    "timeStamp" VARCHAR NOT NULL,

    CONSTRAINT "UserFeedBack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserMessages" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "messageId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "timeStamp" VARCHAR NOT NULL,
    "isMessageSeen" BOOLEAN,
    "isReceived" BOOLEAN,
    "isDelevered" BOOLEAN,

    CONSTRAINT "UserMessages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."managerFeedBack" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "project_delivery" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "work_accuracy" INTEGER NOT NULL,
    "team_collaboration" INTEGER NOT NULL,
    "areas_for_improvement" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "timeStamp" VARCHAR NOT NULL,

    CONSTRAINT "managerFeedBack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."roles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_roles" (
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "assigned_at" VARCHAR NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("user_id","role_id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR NOT NULL,
    "mobilenumber" VARCHAR,
    "emailId" VARCHAR,
    "picture" VARCHAR,
    "password" VARCHAR NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Channels" (
    "id" VARCHAR NOT NULL,

    CONSTRAINT "Channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Members" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "channelId" VARCHAR NOT NULL,

    CONSTRAINT "Members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."alembic_version" (
    "version_num" VARCHAR(32) NOT NULL,

    CONSTRAINT "alembic_version_pkc" PRIMARY KEY ("version_num")
);

-- CreateTable
CREATE TABLE "public"."tiggerfeedback" (
    "id" SERIAL NOT NULL,
    "isFeedBackOpen" BOOLEAN,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "tiggerfeedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ix_GroupMessages_id" ON "public"."GroupMessages"("id");

-- CreateIndex
CREATE INDEX "ix_IndividualMessage_id" ON "public"."IndividualMessage"("id");

-- CreateIndex
CREATE INDEX "ix_IndividualMessage_channelId" ON "public"."IndividualMessage"("channelId");

-- CreateIndex
CREATE INDEX "ix_IndividualMessageStatus_id" ON "public"."IndividualMessageStatus"("id");

-- CreateIndex
CREATE INDEX "ix_IndividualMessageStatus_messageId" ON "public"."IndividualMessageStatus"("messageId");

-- CreateIndex
CREATE INDEX "ix_IndividualMessageStatus_receiverId" ON "public"."IndividualMessageStatus"("receiverId");

-- CreateIndex
CREATE INDEX "ix_ProjectMembers_id" ON "public"."ProjectMembers"("id");

-- CreateIndex
CREATE INDEX "ix_Projects_id" ON "public"."Projects"("id");

-- CreateIndex
CREATE INDEX "ix_UserFeedBack_id" ON "public"."UserFeedBack"("id");

-- CreateIndex
CREATE INDEX "ix_UserFeedBack_projectId" ON "public"."UserFeedBack"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "uix_project_employee_feedback" ON "public"."UserFeedBack"("projectId", "senderId");

-- CreateIndex
CREATE INDEX "ix_UserMessages_id" ON "public"."UserMessages"("id");

-- CreateIndex
CREATE INDEX "ix_managerFeedBack_id" ON "public"."managerFeedBack"("id");

-- CreateIndex
CREATE UNIQUE INDEX "uix_project_manager_feedback" ON "public"."managerFeedBack"("projectId", "receiverId");

-- CreateIndex
CREATE UNIQUE INDEX "ix_users_emailId" ON "public"."users"("emailId");

-- CreateIndex
CREATE INDEX "ix_users_id" ON "public"."users"("id");

-- CreateIndex
CREATE INDEX "ix_Channels_id" ON "public"."Channels"("id");

-- CreateIndex
CREATE INDEX "ix_Members_channelId" ON "public"."Members"("channelId");

-- CreateIndex
CREATE INDEX "ix_Members_id" ON "public"."Members"("id");

-- CreateIndex
CREATE INDEX "ix_tiggerfeedback_id" ON "public"."tiggerfeedback"("id");

-- AddForeignKey
ALTER TABLE "public"."GroupMessages" ADD CONSTRAINT "GroupMessages_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."GroupMessages" ADD CONSTRAINT "GroupMessages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."IndividualMessage" ADD CONSTRAINT "IndividualMessage_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "public"."Channels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."IndividualMessage" ADD CONSTRAINT "IndividualMessage_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."IndividualMessage" ADD CONSTRAINT "IndividualMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."IndividualMessageStatus" ADD CONSTRAINT "IndividualMessageStatus_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "public"."IndividualMessage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."IndividualMessageStatus" ADD CONSTRAINT "IndividualMessageStatus_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ProjectMembers" ADD CONSTRAINT "ProjectMembers_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ProjectMembers" ADD CONSTRAINT "ProjectMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Projects" ADD CONSTRAINT "Projects_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."UserFeedBack" ADD CONSTRAINT "UserFeedBack_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."UserFeedBack" ADD CONSTRAINT "UserFeedBack_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."UserMessages" ADD CONSTRAINT "UserMessages_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "public"."GroupMessages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."UserMessages" ADD CONSTRAINT "UserMessages_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."UserMessages" ADD CONSTRAINT "UserMessages_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."managerFeedBack" ADD CONSTRAINT "managerFeedBack_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."managerFeedBack" ADD CONSTRAINT "managerFeedBack_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Members" ADD CONSTRAINT "Members_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "public"."Channels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Members" ADD CONSTRAINT "Members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."tiggerfeedback" ADD CONSTRAINT "tiggerfeedback_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
