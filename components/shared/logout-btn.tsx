"use client";
import { removeUserSession } from "@/actions/session";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

export const LogoutBtn = () => {
  const handler = async () => {
    await removeUserSession();
    redirect("/");
  };

  return (
    <Button variant={"destructive"} onClick={handler}>
      Logout
    </Button>
  );
};
