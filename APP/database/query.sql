
CREATE DATABASE divrt_meeting;

CREATE SCHEMA divrt;

CREATE TABLE "divrt"."meeting_room" (
  "uid" SERIAL PRIMARY KEY,
  "room_name" varchar(255) COLLATE "pg_catalog"."default",
  "room_capacity" int4,
  "created_at" timestamp(6),
  "updated_at" timestamp(6),
  CONSTRAINT "meeting_room_pkey" PRIMARY KEY ("uid")
);

 
CREATE TABLE "divrt"."schedule_meeting" (
  "uid" SERIAL PRIMARY KEY,
  "booking_date" date,
  "booking_start_time" varchar(10) COLLATE "pg_catalog"."default",
  "booking_end_time" varchar(10) COLLATE "pg_catalog"."default",
  "capacity" int4,
  "meeting_room_uid" int4,
  "created_at" timestamp(6),
  CONSTRAINT "schedule_meeting_pkey" PRIMARY KEY ("uid")
);