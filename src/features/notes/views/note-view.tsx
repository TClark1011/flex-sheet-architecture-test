import { RootLayout } from "@/components/layouts/root-layout";
import { FULL_NOTE_STUB } from "@/constants/stubs";
import { useSaveNoteMutation } from "@/features/notes/hooks/note-mutation-hooks";
import { useDebouncedValue } from "@/hooks/debounce-hooks";
import { useInputState } from "@/hooks/use-input-state";
import { useNotePageParams } from "@/logic/page-param-helpers";
import { Button, Swap, TextInput } from "@/packages/ui";
import type { NoteWithAuthor } from "@/types/extra-entity-types";
import { trpc } from "@/utils/trpc";
import { IconDeviceFloppy, IconPencil } from "@tabler/icons";
import type { FC } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";

export const NoteView: FC = () => {
  const { noteId } = useNotePageParams();
  const { data: note = FULL_NOTE_STUB } = trpc.note.getNote.useQuery({
    noteId,
  });

  const [currentContent, contentTextAreaProps] = useInputState(note.content);
  const [lastSavedContent, setLastSavedContent] = useState(currentContent);

  const [currentTitle, titleInputProps] = useInputState(note.title);
  const [lastSavedTitle, setLastSavedTitle] = useState(currentTitle);

  const [canEditTitle, setCanEditTitle] = useState(false);

  const { mutateAsync: saveNote, isLoading: noteIsSaving } =
    useSaveNoteMutation();
  const debouncedIsLoading = useDebouncedValue(noteIsSaving, 500);

  const thereArePendingChanges = currentContent !== lastSavedContent;

  const handleSaveContent = () => {
    saveNote({
      noteId: note.id,
      content: currentContent,
    }).then(() => {
      setLastSavedContent(currentContent);
    });
  };

  const handleSaveTitle = useCallback(() => {
    if (lastSavedTitle === currentTitle) return;
    saveNote({
      noteId: note.id,
      title: currentTitle,
    }).then(() => {
      setLastSavedTitle(currentTitle);
    });
  }, [setLastSavedTitle, lastSavedTitle, currentTitle, saveNote, note]);

  useEffect(() => {
    if (currentTitle !== lastSavedTitle && !canEditTitle) {
      handleSaveTitle();
    }
  }, [currentTitle, lastSavedTitle, canEditTitle, handleSaveTitle]);

  return (
    <RootLayout className="flex justify-center">
      <div className="items-center container-[600px]">
        <div className="mb-4 flex justify-between">
          <TextInput
            aria-label="note-title"
            bordered={canEditTitle}
            className="text-xl font-bold"
            readOnly={!canEditTitle}
            {...titleInputProps}
          />
          <Swap
            on={<IconDeviceFloppy />}
            off={<IconPencil />}
            checked={canEditTitle}
            onChange={() => {
              setCanEditTitle((curr) => !curr);
            }}
          />
        </div>
        <textarea {...contentTextAreaProps} className="w-full resize-none" />
        <Button
          colorScheme="secondary"
          onClick={handleSaveContent}
          isLoading={debouncedIsLoading}
          disabled={!thereArePendingChanges}
        >
          Save
        </Button>
      </div>
    </RootLayout>
  );
};
