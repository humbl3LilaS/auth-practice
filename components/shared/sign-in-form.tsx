"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { signInSchema, TSignInSchema } from "@/lib/schema";
import { Input } from "../ui/input";
import { signIn } from "@/actions/auth";
import { useRouter } from "next/navigation";

export function SignInForm() {
  const [error, setError] = useState<string>();
  const form = useForm<z.infer<typeof signInSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  async function onSubmit(data: TSignInSchema) {
    const res = await signIn(data);
    if (res) {
      router.push("/");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {error && <p className="text-destructive">{error}</p>}
        <div className="flex gap-4">
          <Button
            type="button"
            // onClick={async () => await oAuthSignIn("discord")}
          >
            Discord
          </Button>
          <Button
            type="button"
            // onClick={async () => await oAuthSignIn("github")}
          >
            GitHub
          </Button>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 justify-end">
          <Button asChild variant="link">
            <Link href="/sign-up">Sign Up</Link>
          </Button>
          <Button type="submit">Sign In</Button>
        </div>
      </form>
    </Form>
  );
}
