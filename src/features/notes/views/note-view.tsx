import { RootLayout } from "@/components/layouts/root-layout";
import type { FC } from "react";
import { DeleteTagModal } from "@/features/notes/components/modals/delete-tag-modal";
import { NoteContentEdit } from "@/features/notes/components/note-content-edit-delete";
import { NoteTitleEdit } from "@/features/notes/components/note-title-edit";
import { NotePublicToggle } from "@/features/notes/components/note-public-toggle";
import { NoteTagsEdit } from "@/features/notes/components/note-tags-edit";
import { SingleNoteQueryManager } from "@/features/notes/components/effect-managers/single-note-query-manager";
import { useRenderLogger } from "@/hooks/use-render-logger";

export const NoteView: FC = () => {
  useRenderLogger("NoteView");
  return (
    <>
      <SingleNoteQueryManager />

      <RootLayout className="flex justify-center">
        <div className="items-center container-[600px]">
          <div className="mb-4 flex items-center justify-between">
            <NoteTitleEdit />
            <NotePublicToggle />
          </div>

          <NoteTagsEdit className="mb-2" />

          <NoteContentEdit />
        </div>
      </RootLayout>

      <DeleteTagModal />
    </>
  );
};
