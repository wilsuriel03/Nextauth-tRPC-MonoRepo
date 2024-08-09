"use client";

import type { z } from "zod";
import { useState } from "react";

import { Button } from "@acme/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "@acme/ui/form";
import { Input } from "@acme/ui/input";
import { SignInSchema } from "@acme/validators";

import FormError from "~/app/_components/forms/form-error";
import { api } from "~/trpc/react";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    schema: SignInSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signIn = api.auth.adminSignIn.useMutation();

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    try {
      await signIn.mutateAsync(values);
    } catch (err) {
      console.log("Sign-In error:", err);
    }
  };

  return (
    <>
      <FormError message={signIn.error?.message} />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="mb-1 text-sm text-white"
                    htmlFor="email"
                  >
                    Email
                  </FormLabel>
                  <FormControl>
                      <Input
                        {...field}
                        disabled={signIn.isPending}
                        type="email"
                        autoFocus
                        autoComplete="email"
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <div className="flex flex-col flex-wrap gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="mb-1 text-sm text-white"
                    htmlFor="password"
                  >
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={signIn.isPending}
                        type={showPassword ? "text" : "password"}
                        autoFocus
                        
                      />
                      <Button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 end-0 flex items-center z-20 text-white px-3 cursor-pointer"
                      >
                        {showPassword ? ( 'Hide' ) : ( 'Show' )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
            type="submit"
              className="mt-3 h-auto min-h-8 min-w-8 bg-white px-4 py-3 text-black"
              disabled={signIn.isPending}
            >
              Sign in
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
