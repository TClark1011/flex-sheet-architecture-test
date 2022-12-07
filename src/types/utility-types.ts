import type { DehydratedState } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import type { Session } from "next-auth";

export type ExcludeNullFromValues<T> = {
  [K in keyof T]: Exclude<T[K], null>;
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
