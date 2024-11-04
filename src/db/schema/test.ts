import { sql } from "drizzle-orm";
import {  text, timestamp, varchar } from "drizzle-orm/pg-core";

// ** import db utils
import { pgTable } from "@/db/utils";

import { uuid as uuidv4 } from "uuidv4";

export const test = pgTable("test", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  test_field: varchar("test_field", { length: 256 }),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type Customer = typeof test.$inferSelect;
export type NewCustomer = typeof test.$inferInsert;
