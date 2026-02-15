"use server";

import { UserRole } from "@/db/schema";
import { redis } from "@/lib/redis";
import crypto from "crypto";
import { cookies } from "next/headers";

const EXPIRATION = 60 * 60 * 24 * 7;
const COOKIE_SESSION = "auth-session-id";

export const createSession = async (payload: {
  id: string;
  role: UserRole;
}) => {
  const sessionId = crypto.randomBytes(256).toString("hex").normalize();
  await redis.set(`session:${sessionId}`, JSON.stringify(payload), {
    expiration: { type: "EX", value: EXPIRATION },
  });
  await setCookie(sessionId);
};

const setCookie = async (sessionId: string) => {
  const cookie = await cookies();
  cookie.set(COOKIE_SESSION, sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
    expires: Date.now() + EXPIRATION * 1000,
  });
};

export const removeUserSession = async () => {
  const cookie = await cookies();

  const sessionId = cookie.get(COOKIE_SESSION)?.value;

  if (!sessionId) return null;

  await redis.del(`session:${sessionId}`);
  cookie.delete(COOKIE_SESSION);
};
