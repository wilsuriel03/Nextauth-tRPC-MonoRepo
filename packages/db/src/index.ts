import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as auth from "./schema/auth";

export const schema = { ...auth };

export * from "drizzle-orm";

const sql = neon(process.env.DB_URI!);
export const db = drizzle(sql, { schema, logger: true });


// import { Pool } from "@neondatabase/serverless";
// import { drizzle } from "drizzle-orm/neon-serverless";

// import * as auth from "./schema/auth";

// export const schema = { ...auth };

// export * from "drizzle-orm";

// const pool = new Pool({ connectionString: process.env.DB_URI! });
// export const db = drizzle(pool, { schema, logger: true });
