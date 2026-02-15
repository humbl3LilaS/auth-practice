"use client";

import { toggleRole } from "@/actions/toggle-role";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ToggleRoleButton() {
  const router = useRouter();
  const handler = async () => {
    await toggleRole();
    router.refresh();
  };
  return <Button onClick={handler}>Toggle Role</Button>;
}
