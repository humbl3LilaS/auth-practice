"use server";

import { redirect } from "next/navigation";
import { getCurrentUserInfo } from "./auth";
import { db } from "@/db/dirzzle";
import { UserTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const toggleRole = async () => {
  const currentUser = await getCurrentUserInfo();
  if (!currentUser) {
    return redirect("/");
  }
  await db
    .update(UserTable)
    .set({
      role: currentUser.role === "admin" ? "user" : "admin",
    })
    .where(eq(UserTable.id, currentUser.id));
};
