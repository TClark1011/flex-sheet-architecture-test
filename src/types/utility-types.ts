import type { DehydratedState } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import type { Session } from "next-auth";

export type ExcludeFromValues<Obj, TypeToExclude> = {
	[K in keyof Obj]: Exclude<Obj[K], TypeToExclude>;
};

export type EmptyObject = Record<never, never>;

export type WithSession = {
	authSession: Session;
	// For some reason NextJS has bugs when you try to pass
	// a prop named just "session" via SSR.
};

export type WithClassName = {
	className?: string;
};

export type StandardGetServerSidePropsWithPrefetch = GetServerSideProps<{
	trpcState: DehydratedState;
}>;
// we can use this with the `satisfies` keyword when defining a
// `getServerSideProps` function to make sure we are correctly
// handling the prefetching of trpc queries

export type StringThatIncludes<Substring extends string> =
	`${string}${Substring}${string}`;

export type ContentPermission = "edit" | "view";
