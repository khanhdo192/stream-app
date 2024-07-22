"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const ErrorPage = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      router.refresh();
    }
  }, [pathname, router]);

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <p>Something went wrong</p>
      <Button variant="secondary" asChild>
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
