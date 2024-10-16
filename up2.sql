CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "username" varchar(255),
  "email" varchar(255),
  "phoneno" integer,
  "contry_code" varchar(5),
  "role" varchar(255),
  "lease_start_date" timestamp,
  "lease_end_date" timestamp,
  "rent_start_date" timestamp,
  "grace_period" integer,
  "broker_id" integer,
  "created_at" timestamp,
  "updated_at" timestamp,
  "is_active" boolean DEFAULT true
);

CREATE TABLE "brokers" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "email" varchar,
  "phoneno" varchar,
  "created_at" timestamp,
  "updated_at" timestamp,
  "is_active" boolean DEFAULT true
);

CREATE TABLE "estates" (
  "id" integer PRIMARY KEY,
  "name" varchar(255),
  "bed" integer,
  "description" varchar(255),
  "bathtub" integer,
  "bhk" integer,
  "address" varchar(255),
  "sqft" integer,
  "is_active" boolean DEFAULT true,
  "broker_id" integer,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "estate_image" (
  "id" integer PRIMARY KEY,
  "estate_id" integer,
  "img" varchar(255),
  "is_active" boolean DEFAULT true,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "amenities_master" (
  "id" integer PRIMARY KEY,
  "name" varchar(255),
  "price" decimal,
  "img" varchar(255),
  "valid_from" timestamp,
  "valid_to" timestamp,
  "estate_id" integer,
  "is_active" boolean DEFAULT true,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "utilities_master" (
  "id" integer PRIMARY KEY,
  "name" varchar(255),
  "price" decimal,
  "img" varchar(255),
  "valid_from" timestamp,
  "valid_to" timestamp,
  "estate_id" integer,
  "is_active" boolean DEFAULT true,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "user_estates" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "estate_id" integer,
  "created_at" timestamp,
  "is_active" boolean DEFAULT true,
  "updated_at" timestamp
);

CREATE TABLE "quotations" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "estate_id" integer,
  "is_active" boolean DEFAULT true,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "pricingtable" (
  "id" integer PRIMARY KEY,
  "pricingtype" varchar(255),
  "allpriceobject" json,
  "quotation_id" integer,
  "discount_type" varchar(255),
  "discount_amount" decimal,
  "is_active" boolean DEFAULT true,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "amenities" (
  "id" integer PRIMARY KEY,
  "amenities_id" integer,
  "free" boolean,
  "quotation_id" integer,
  "discount_type" varchar(255),
  "discount_amount" decimal,
  "is_active" boolean DEFAULT true,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "utilities" (
  "id" integer PRIMARY KEY,
  "utilities_id" integer,
  "free" boolean,
  "quotation_id" integer,
  "discount_type" varchar(255),
  "discount_amount" decimal,
  "is_active" boolean DEFAULT true,
  "created_at" timestamp,
  "updated_at" timestamp
);

ALTER TABLE "users" ADD FOREIGN KEY ("broker_id") REFERENCES "brokers" ("id");

ALTER TABLE "estates" ADD FOREIGN KEY ("broker_id") REFERENCES "brokers" ("id");

ALTER TABLE "estate_image" ADD FOREIGN KEY ("estate_id") REFERENCES "estates" ("id");

ALTER TABLE "amenities_master" ADD FOREIGN KEY ("estate_id") REFERENCES "estates" ("id");

ALTER TABLE "utilities_master" ADD FOREIGN KEY ("estate_id") REFERENCES "estates" ("id");

ALTER TABLE "user_estates" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_estates" ADD FOREIGN KEY ("estate_id") REFERENCES "estates" ("id");

ALTER TABLE "quotations" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "quotations" ADD FOREIGN KEY ("estate_id") REFERENCES "estates" ("id");

ALTER TABLE "pricingtable" ADD FOREIGN KEY ("quotation_id") REFERENCES "quotations" ("id");

ALTER TABLE "amenities" ADD FOREIGN KEY ("amenities_id") REFERENCES "amenities_master" ("id");

ALTER TABLE "amenities" ADD FOREIGN KEY ("quotation_id") REFERENCES "quotations" ("id");

ALTER TABLE "utilities" ADD FOREIGN KEY ("utilities_id") REFERENCES "amenities_master" ("id");

ALTER TABLE "utilities" ADD FOREIGN KEY ("quotation_id") REFERENCES "quotations" ("id");
