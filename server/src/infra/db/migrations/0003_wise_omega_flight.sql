ALTER TABLE "links" RENAME COLUMN "link" TO "original_url";--> statement-breakpoint
ALTER TABLE "links" RENAME COLUMN "short_link" TO "short_url";--> statement-breakpoint
ALTER TABLE "links" DROP CONSTRAINT "links_link_unique";--> statement-breakpoint
ALTER TABLE "links" DROP CONSTRAINT "links_short_link_unique";--> statement-breakpoint
ALTER TABLE "links" ADD COLUMN "access_count" integer;--> statement-breakpoint
ALTER TABLE "links" ADD CONSTRAINT "links_short_url_unique" UNIQUE("short_url");