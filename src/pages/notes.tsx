import { UserNotesView } from "@/features/notes";
import { createProtectedGetServerSideProps } from "@/utils/ssr-utils";
import type { NextPage } from "next";
import type { StandardGetServerSidePropsWithPrefetch } from "@/types/utility-types";
import { createTRPCServerHelpers } from "@/server/trpc/server-helpers";

export const getServerSideProps = createProtectedGetServerSideProps(
  async (_, context) => {
    const trpcClient = await createTRPCServerHelpers(context);

    await trpcClient.note.getCurrentUserNotes.prefetch();

    return {
      trpcState: trpcClient.dehydrate(),
    };
  }
) satisfies StandardGetServerSidePropsWithPrefetch;

const NotesPage: NextPage = UserNotesView;

export default NotesPage;
