import { auth, signOut } from "@acme/auth/admin";
import { Button } from "@acme/ui/button";

export default async function DashboardPage() {
  const session = await auth();
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-black">
        {session && <span>Logged in as {session?.user.name}</span>}
      </p>

      <form>
        <Button
          size="lg"
          formAction={async () => {
            "use server";
            await signOut();
          }}
          className="mt-3 h-auto min-h-8 w-full min-w-8 bg-white px-4 py-3 text-black"
        >
          Sign out
        </Button>
      </form>
    </div>
  );
}
