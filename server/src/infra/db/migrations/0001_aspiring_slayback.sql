CREATE TABLE "links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"link" text NOT NULL,
	"short_link" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	CONSTRAINT "links_link_unique" UNIQUE("link"),
	CONSTRAINT "links_short_link_unique" UNIQUE("short_link")
);
