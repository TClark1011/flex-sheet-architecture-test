import { NoteView } from "@/features/notes";
import type { NextPage } from "next";
import { notePageParamSchema } from "@/logic/page-param-helpers";
import { createTRPCServerHelpers } from "@/server/trpc/server-helpers";
import type { StandardGetServerSidePropsWithPrefetch } from "@/types/utility-types";

export const getServerSideProps = (async (context) => {
  const trpcClient = await createTRPCServerHelpers(context);
  const { noteId } = notePageParamSchema.parse(context.params);

  try {
    await trpcClient.note.getNote.fetch({ noteId });
  } catch {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      trpcState: trpcClient.dehydrate(),
    },
  };
}) satisfies StandardGetServerSidePropsWithPrefetch;

const Page: NextPage = NoteView;

export default Page;
