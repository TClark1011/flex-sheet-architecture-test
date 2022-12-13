import { useSaveNoteMutation } from "@/features/notes/hooks/note-mutation-hooks";
import {
  noteIdSelectorAtom,
  noteTitleSelectorAtom,
} from "@/features/notes/stores/note-atoms";
import { useInputState } from "@/hooks/use-input-state";
import { Swap, TextInput } from "$ui";
import { IconDeviceFloppy, IconPencil } from "@tabler/icons";
import { useAtomValue } from "jotai";
import type { ChangeEvent, FC } from "react";
import { useState } from "react";
import type { WithClassName } from "@/types/utility-types";
import { cx } from "class-variance-authority";
import { useRenderLogger } from "@/hooks/use-render-logger";

const useNoteTitleEdit = () => {
  const { mutateAsync: saveNote, isLoading: noteIsSaving } =
    useSaveNoteMutation();

  const noteId = useAtomValue(noteIdSelectorAtom);
  const noteTitle = useAtomValue(noteTitleSelectorAtom);

  const [newTitle, inputStateProps] = useInputState(noteTitle);
  const [titleIsEditable, setTitleIsEditable] = useState(false);

  const onSave = () =>
    saveNote({
      noteId,
      data: {
        title: newTitle,
      },
    });

  return {
    inputProps: {
      ...inputStateProps,
      readOnly: !titleIsEditable,
      disabled: noteIsSaving,
    },
    onSave,
    editableCheckboxProps: {
      checked: titleIsEditable,
      disabled: noteIsSaving,
      onChange: async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked) {
          await onSave();
          setTitleIsEditable(false);
        } else {
          setTitleIsEditable(e.target.checked);
        }
      },
    },
    titleIsEditable,
  };
};

export const NoteTitleEdit: FC<WithClassName> = ({ className }) => {
  useRenderLogger("NoteTitleEdit");

  const { inputProps, editableCheckboxProps, titleIsEditable } =
    useNoteTitleEdit();

  return (
    <div className={cx("items-center hstack-2", className)}>
      <Swap
        {...editableCheckboxProps}
        on={<IconDeviceFloppy />}
        off={<IconPencil />}
      />
      <TextInput
        {...inputProps}
        aria-label="Note Title"
        placeholder="Enter Note Title"
        bordered={titleIsEditable}
        variant={titleIsEditable ? "solid" : "ghost"}
        className="text-xl font-bold"
      />
    </div>
  );
};
