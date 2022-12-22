import { trpc } from "@/utils/trpc";
import type { useSession as useNextAuthSession } from "next-auth/react";

type SessionStatus = ReturnType<typeof useNextAuthSession>["status"];

const useStandardSessionQuery = () => trpc.auth.getSession.useQuery();

const deriveSessionStatus = (
	query: ReturnType<typeof useStandardSessionQuery>
): SessionStatus => {
	if (!query.data && query.isLoading) return "loading";

	if (!query.data && !query.isLoading) return "unauthenticated";

	return "authenticated";
};

// A custom `useSession` hook to use instead of the one from `next-auth/react`
// We do this because our custom hook will use the `getSession` query from TRPC
// which we are able to prefetch on the server.
export const useSession = () => {
	const sessionQuery = trpc.auth.getSession.useQuery();

	return {
		status: deriveSessionStatus(sessionQuery),
		data: sessionQuery.data,
	};
};
