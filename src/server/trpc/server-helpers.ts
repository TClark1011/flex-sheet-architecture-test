import { createContextInner } from "@/server/trpc/context";
import { appRouter } from "@/server/trpc/router/_app";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type { GetServerSidePropsContext } from "next";
import type { Dictionary } from "ts-essentials";
import superjson from "superjson";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";

export const createTRPCServerHelpers = async <T extends Dictionary<any>>(
	context: GetServerSidePropsContext<T>
) => {
	const session = await getServerAuthSession(context);
	const trpcContext = await createContextInner({ session });

	return createProxySSGHelpers({
		router: appRouter,
		ctx: trpcContext,
		transformer: superjson,
	});
};
