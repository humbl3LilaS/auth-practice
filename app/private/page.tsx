import { Button } from "@/components/ui/button"
import Link from "next/link"
// import { getCurrentUser } from "@/auth/nextjs/currentUser"
import { ToggleRoleButton } from "@/components/shared/toggle-role-button"

export default async function PrivatePage() {
  // const currentUser = await getCurrentUser({ redirectIfNotFound: true })

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-2">
        <ToggleRoleButton />
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  )
}
