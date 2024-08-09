import { AuthError } from "next-auth";
import type { TRPCRouterRecord } from "@trpc/server";
import { signIn as customerSignIn } from "@acme/auth";
import { signIn as adminSignIn } from "@acme/auth/admin";
import { validateCredentials } from "@acme/utils";
import {
  SignInSchema,
} from "@acme/validators";

import { protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = {
  customerSignIn: publicProcedure
    .input(SignInSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      try {
        const user = await validateCredentials({
          email,
          password,
          userType: "customer",
        });
        if (!user) throw new Error("Invalid email or password.");
        await customerSignIn("credentials", {
          email,
          password,
          userType: "customer",
          redirectTo: "/",
        });
      } catch (err) {
        if (err instanceof AuthError && err.type === "CredentialsSignin") {
          throw new Error("Invalid email or password.");
        }
        throw err;
      }
    }),

  adminSignIn: publicProcedure
    .input(SignInSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      try {
        const user = await validateCredentials({
          email,
          password,
          userType: "admin",
        });
        if (!user) throw new Error("Invalid email or password.");
        await adminSignIn("credentials", {
          email,
          password,
          userType: "admin",
          redirect: false,
        });
      } catch (err) {
        if (err instanceof AuthError && err.type === "CredentialsSignin") {
          throw new Error("Invalid email or password.");
        }
        throw err;
      }
    }),

  
  getSecretMessage: protectedProcedure.query(() => {
    // testing type validation of overridden next-auth Session in @acme/auth package
    return "you can see this secret message!";
  }),
} satisfies TRPCRouterRecord;
