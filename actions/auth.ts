"use server";
import { db } from "@/db/dirzzle";
import { UserTable } from "@/db/schema";
import { TSignUpSchema } from "@/lib/schema";
import { generateSalt, hashPassword } from "@/lib/utils";
import { and, eq } from "drizzle-orm";
import { success } from "zod/mini";
import { createSession, getUserSession } from "./session";
import { redirect } from "next/dist/server/api-utils";

export const signUp = async (payload: TSignUpSchema) => {
  const [existingUser] = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.email, payload.email));

  if (existingUser)
    return {
      success: false,
      message: "Account already exist of this email",
    };
  try {
    const salt = generateSalt();
    const hashedPassword = await hashPassword(payload.password, salt);

    const [user] = await db
      .insert(UserTable)
      .values({
        ...payload,
        password: hashedPassword as string,
        salt: salt,
      })
      .returning({ id: UserTable.id, role: UserTable.role });

    if (!user) {
      return {
        success: false,
        message: "Error creating new user",
      };
    }
    await createSession(user);
    return {
      success: true,
      message: "Login Success",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getCurrentUserInfo = async () => {
  const session = await getUserSession();

  if (!session) return null;

  const [data] = await db
    .select({ id: UserTable.id, name: UserTable.name, role: UserTable.role })
    .from(UserTable)
    .where(eq(UserTable.id, session.id));

  return data;
};
