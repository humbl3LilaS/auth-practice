import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ToggleRoleButton } from "@/components/shared/toggle-role-button";
import { getCurrentUserInfo } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function PrivatePage() {
  const user = await getCurrentUserInfo();
  if (!user) {
    return redirect("/sign-in");
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl mb-8">Private: {user.role}</h1>
      <div className="flex gap-2">
        <ToggleRoleButton />
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  );
}
