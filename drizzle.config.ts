import { type Config } from "drizzle-kit";

import { database_prefix } from "@/lib/constants";
import { env } from "@/config/env";

export default {
  schema: "./src/db/schema/index.ts",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: [`${database_prefix}_*`],
  verbose: true,
  strict: true,
} satisfies Config;
