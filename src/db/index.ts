import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// import schemas
import * as schema from "./schema";

// import config
import { env } from "@/config/env";

const client = postgres(env.DATABASE_URL, {
  ssl: {
    rejectUnauthorized: false,
  },
});
export const db = drizzle(client, { schema, logger: true });
