import type { Config } from "drizzle-kit";

if(!process.env.DB_URI) throw new Error("Missing DB_URI env var");

export default {
  schema: "./src/schema",
  out: "./src/migrations",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DB_URI },
} satisfies Config;
