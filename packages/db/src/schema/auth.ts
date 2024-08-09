import type { AdapterAccountType } from "next-auth/adapters";
import {
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

type ExtendedAdapterAccountType = AdapterAccountType | "credentials";

export const adminRoles = pgEnum("admin_roles", [
  "admin",
  "marketing",
  "shipper",
]);

export const userTypes = pgEnum("user_types", ["admin", "customer"]);

// Users table
export const users = pgTable(
  "users",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    password: text("password"),
    image: text("image"),
    userType: userTypes("userType").notNull(),
    role: adminRoles("role"),
  },
  (table) => ({
    emailIndex: index("email_idx").on(table.email),
    userTypeIndex: index("user_type_idx").on(table.userType),
  }),
);

// Accounts table
export const accounts = pgTable(
  "accounts",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<ExtendedAdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);


// Verification tokens table
export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (token) => ({
    compositePk: primaryKey({
      columns: [token.identifier, token.token],
    }),
  }),
);
