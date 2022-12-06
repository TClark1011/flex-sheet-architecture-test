import { Button, Navbar } from "@/packages/ui";
import type { WithClassName } from "@/types/utility-types";
import cx from "classnames";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import type { FC, PropsWithChildren } from "react";

export type RootLayoutProps = PropsWithChildren & WithClassName;
export const RootLayout: FC<RootLayoutProps> = ({ children, className }) => {
  const { status: sessionStatus } = useSession();
  return (
    <main className="min-h-screen w-screen">
      <Navbar
        colorScheme="primary"
        startContent={<Link href="/">Home</Link>}
        className={cx("mb-4", className)}
        endContent={
          <>
            {sessionStatus === "unauthenticated" && (
              <Button
                variant="link"
                onClick={() => signIn()}
                className="text-primary-content"
              >
                Sign In
              </Button>
            )}
            {sessionStatus === "authenticated" && (
              <div className="flex [&>button]:text-primary-content">
                <Link href="/notes" passHref legacyBehavior>
                  <Button variant="link">Notes</Button>
                </Link>
                <Button variant="link" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </div>
            )}
          </>
        }
      />
      {children}
    </main>
  );
};
