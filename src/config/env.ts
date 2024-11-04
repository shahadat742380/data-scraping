// @ts-ignore
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import "dotenv/config";

export const env = createEnv({
  /*
   * ServerSide Environment variables, not available on the client.
   */
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    DATABASE_URL: z.string().min(1),
  },
  /*
   * Environment variables available on the client (and server).
   */
  client: {},

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
  },
});
