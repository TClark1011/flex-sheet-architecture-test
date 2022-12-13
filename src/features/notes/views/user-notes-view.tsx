import { RootLayout } from "@/components/layouts/root-layout";
import { Badge, Button } from "$ui";
import type { FC } from "react";
import { IconPlus } from "@tabler/icons";
import { useCreateNoteMutation } from "@/features/notes/hooks/note-mutation-hooks";
import Link from "next/link";
import { trpc } from "@/utils/trpc";
import { useRenderLogger } from "@/hooks/use-render-logger";

export const UserNotesView: FC = () => {
  useRenderLogger("UserNotesView");

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
                className="rounded-xl bg-base-300 p-4 vstack-2"
              >
                <div>{note.title}</div>
                <div className="box-content h-[5ex] rounded-md border border-base-content p-1 leading-[2.5ex] text-gray-500 line-clamp-2">
                  {note.content}
                </div>
                <div className="flex-wrap hstack-1">
                  {note.tags.map((tag) => (
                    <Badge key={tag.id}>{tag.name}</Badge>
                  ))}
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
