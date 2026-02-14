import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  const user = null;
  return (
    <section className="container mx-auto p-4">
      {!user ? (
        <div className="flex gap-4">
          <Button asChild={true}>
            <Link href={"/sign-in"}>Sign In</Link>
          </Button>
          <Button asChild={true}>
            <Link href={"/sign-up"}>Sign Up</Link>
          </Button>
        </div>
      ) : (
        <Card className="max-w-[500px] mt-4">User exists</Card>
      )}
    </section>
  );
}
