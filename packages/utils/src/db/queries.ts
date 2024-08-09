import { db } from "@acme/db";

import { UserType } from "../types";

export const getUser = async (email: string, userType: UserType) => {
  return await db.query.users.findFirst({
    where: (users, { and, eq }) =>
      and(eq(users.email, email), eq(users.userType, userType)),
  });
};

export const getUserById = async (userId: string) => {
  return await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  });
};
