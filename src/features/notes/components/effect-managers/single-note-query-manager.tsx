import { FULL_NOTE_STUB } from "@/constants/stubs";
import {
  noteAtom,
  noteTitleSelectorAtom,
} from "@/features/notes/stores/note-atoms";
import { useNotePageParams } from "@/logic/page-param-helpers";
import { trpc } from "@/utils/trpc";
import { useAtomValue, useHydrateAtoms, useUpdateAtom } from "jotai/utils";
import type { FC } from "react";
import { useEffect } from "react";

const useNoteQuery = () => {
  const setNoteData = useUpdateAtom(noteAtom);
  const { noteId } = useNotePageParams();
  const { data = FULL_NOTE_STUB } = trpc.note.getNote.useQuery({
    noteId,
  });

  useHydrateAtoms([[noteAtom, data]]);

  useEffect(() => {
    setNoteData(data);
  }, [setNoteData, data]);
};

export const SingleNoteQueryManager: FC = () => {
  useNoteQuery();

  const noteStateData = useAtomValue(noteAtom);
  const noteStateTitle = useAtomValue(noteTitleSelectorAtom);
  useEffect(() => {
    console.log("(single-note-query-manager):", {
      noteStateData,
      noteStateTitle,
    });
  }, [noteStateData, noteStateTitle]);

  return null;
};
