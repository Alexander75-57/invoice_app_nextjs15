ALTER TABLE "customers" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN "description";