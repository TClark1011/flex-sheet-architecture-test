import { Button, Navbar } from "$ui";
import { useSession } from "@/hooks/use-session";
import type { WithClassName } from "@/types/utility-types";
import cx from "classnames";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC, PropsWithChildren } from "react";

export type RootLayoutProps = PropsWithChildren &
	WithClassName & {
		fullWidth?: boolean;
	};
export const RootLayout: FC<RootLayoutProps> = ({
	children,
	className,
	fullWidth = false,
}) => {
	const { status: sessionStatus } = useSession();
	const { pathname } = useRouter();

	return (
		<main className="flex min-h-screen w-screen flex-col">
			<Navbar
				colorScheme="primary"
				startContent={<Link href="/">Home</Link>}
				endContent={
					<>
						{sessionStatus === "unauthenticated" && pathname !== "/sign-in" && (
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
								{pathname !== "/sign-in" && (
									<Link href="/notes" passHref legacyBehavior>
										<Button variant="link">Notes</Button>
									</Link>
								)}
								<Button variant="link" onClick={() => signOut()}>
									Sign Out
								</Button>
							</div>
						)}
					</>
				}
			/>
			<div
				className={cx(
					"flex-grow px-4 pt-4",
					!fullWidth && "flex justify-center",
					fullWidth && className
				)}
			>
				{fullWidth && children}
				{!fullWidth && (
					<div className={cx("container-[600px]", className)}>{children}</div>
				)}
			</div>
		</main>
	);
};
