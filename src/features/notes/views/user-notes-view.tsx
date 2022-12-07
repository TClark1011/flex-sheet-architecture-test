import { RootLayout } from "@/components/layouts/root-layout";
import { Button } from "$ui";
import type { WithSession } from "@/types/utility-types";
import type { Note } from "@prisma/client";
import type { FC } from "react";
import { IconPlus } from "@tabler/icons";
import { useCreateNoteMutation } from "@/features/notes/hooks/note-mutation-hooks";
import Link from "next/link";
import { trpc } from "@/utils/trpc";

export const UserNotesView: FC = () => {
  const { data: notes = [] } = trpc.note.getCurrentUserNotes.useQuery();
  const { mutate: createNote, isLoading: noteIsBeingCreated } =
    useCreateNoteMutation();
  return (
    <RootLayout>
      <div className="mb-8">
        {notes.length > 0 && (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
            {notes.map((note) => (
              <Link
                href={`/note/${note.id}`}
                key={note.id}
                className="rounded-xl bg-base-300 p-4 shadow-lg"
              >
                <div className="mb-2">{note.title}</div>
                <div className="truncate rounded-md border border-base-content p-1 text-gray-500">
                  {note.content}
                </div>
              </Link>
            ))}
          </div>
        )}
        {notes.length === 0 && <p>You have no notes</p>}
      </div>
      <Button
        colorScheme="primary"
        leftIcon={<IconPlus />}
        onClick={() => createNote()}
        isLoading={noteIsBeingCreated}
      >
        Create New Note
      </Button>
    </RootLayout>
  );
};
