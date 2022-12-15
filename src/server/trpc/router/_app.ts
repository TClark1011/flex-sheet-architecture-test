import { noteRouter } from "@/server/trpc/router/note-router";
import { router } from "../trpc";
import { authRouter } from "./auth";

export const appRouter = router({
	auth: authRouter,
	note: noteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
