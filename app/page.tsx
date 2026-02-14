import { LogoutBtn } from "@/components/shared/logout-btn";
import { Button } from "@/components/ui/button";
import { Card, CardHeader,CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  const user = null;
  return (
   	<section className="container mx-auto p-4">
		{
			!user ? <div className="flex gap-4">		
		<Button  asChild={true}>
			<Link href={"/sign-in"}>
				Sign In
			</Link>
		</Button>
		<Button  asChild={true}>
			<Link href={"/sign-up"}>
				Sign Up
			</Link>
		</Button>

	</div>	: 
		        (<Card className="max-w-[500px] mt-4">
          <CardHeader>
            <CardTitle>User: {user.name}</CardTitle>
            <CardDescription>Role: {user.role}</CardDescription>
          </CardHeader>
          <CardFooter className="flex gap-4">
            <Button asChild variant="outline">
              <Link href="/private">Private Page</Link>
            </Button>
            {user?.role === "admin" && (
              <Button asChild variant="outline">
                <Link href="/admin">Admin Page</Link>
              </Button>
            )}
	    <LogoutBtn/>
          </CardFooter>
        </Card>)	}
	</section> 
  );
}
