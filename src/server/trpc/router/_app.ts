import { noteRouter } from "@/server/trpc/router/note-router";
import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  note: noteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
