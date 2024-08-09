import { signIn } from "@acme/auth/admin";
import { Button } from "@acme/ui/button";

import SignInForm from "./_components/sign-in-form";

export default async function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="px-10 pt-10">
        <div>
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="mb-0.5 text-2xl font-medium text-white">
                Sign in
              </h1>
              <h3 className="text-sm text-white/50">Continue to Admin</h3>
            </div>
          </div>
          <SignInForm />
          <form>
            <Button
              size="lg"
              formAction={async () => {
                "use server";
                await signIn("google", {
                  redirectTo: "/dashboard",
                });
              }}
              className="mt-3 h-auto min-h-8 w-full min-w-8 bg-white px-4 py-3 text-black"
            >
              Sign in with Google
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
