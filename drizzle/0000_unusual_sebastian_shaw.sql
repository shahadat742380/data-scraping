CREATE TABLE IF NOT EXISTS "tbl_test" (
	"id" text PRIMARY KEY NOT NULL,
	"test_field" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT current_timestamp
);
