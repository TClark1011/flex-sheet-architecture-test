import { UserNotesView } from "@/features/notes";
import { simpleProtectedGetServerSideProps } from "@/utils/ssr-utils";
import type { InferGetServerSidePropsType, NextPage } from "next";

export const getServerSideProps = simpleProtectedGetServerSideProps;

const NotesPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = UserNotesView;

export default NotesPage;
