import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hashPassword(password: string, salt: string) {
  return new Promise((resolv, rej) => {
    crypto.scrypt(password.normalize(), salt, 64, (err, hash) => {
      if (err) rej(err);
      resolv(hash.toString("hex").normalize());
    });
  });
}

export function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}
