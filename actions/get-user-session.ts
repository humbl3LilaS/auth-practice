"use server";

import { redis } from "@/lib/redis";
import { sessionSchema } from "@/lib/schema";
import { cookies } from "next/headers";
const COOKIE_SESSION = "auth-session-id";

export const getUserSession = async () => {
  const cookie = await cookies();
  const sessionId = cookie.get(COOKIE_SESSION)?.value;

  if (!sessionId) return null;

  const cachedData = await redis.get(`session:${sessionId}`);

  if (!cachedData) return null;

  const parsedData = JSON.parse(cachedData);

  const { success, data } = sessionSchema.safeParse(parsedData);

  return success ? data : null;
};
