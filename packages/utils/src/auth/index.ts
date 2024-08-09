import bcrypt from "bcryptjs";

import { SignInWithUserTypeSchema } from "@acme/validators";
import { Credentials } from "../types";
import { getUser } from "../db/queries";

export const validateCredentials = async (credentials: Credentials) => {
  const validatedCredentials = SignInWithUserTypeSchema.safeParse(credentials);

  if (validatedCredentials.success) {
    const { email, password, userType } = validatedCredentials.data;

    const user = await getUser(email, userType);
    if (user?.password && (await bcrypt.compare(password, user.password)))
      return user;
  }

  return null;
};
