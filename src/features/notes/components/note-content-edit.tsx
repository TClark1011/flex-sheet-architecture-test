import { useSaveNoteMutation } from "@/features/notes/hooks/note-mutation-hooks";
import {
  noteContentSelectorAtom,
  noteIdSelectorAtom,
} from "@/features/notes/stores/note-atoms";
import { useLoadingStateDebounce } from "@/hooks/logic-hooks";
import { useRenderLogger } from "@/hooks/use-render-logger";
import { Button, Textarea } from "@/packages/ui";
import type { WithClassName } from "@/types/utility-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { cx } from "class-variance-authority";
import { useAtomValue } from "jotai";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const noteContentEditFormSchema = z.object({
  content: z.string(),
});
const noteContentEditFormResolver = zodResolver(noteContentEditFormSchema);

const useNoteContentEditForm = () => {
  const noteContent = useAtomValue(noteContentSelectorAtom);
  const noteId = useAtomValue(noteIdSelectorAtom);

  const { mutateAsync: saveNote } = useSaveNoteMutation();

  const { handleSubmit, ...form } = useForm<
    z.infer<typeof noteContentEditFormSchema>
  >({
    resolver: noteContentEditFormResolver,
    defaultValues: {
      content: noteContent,
    },
  });

  const onSubmit = handleSubmit(async ({ content }) => {
    await saveNote({
      noteId,
      data: {
        content,
      },
    });

    form.reset({ content });
    // we "reset" the form to the new values so that
    // `formState.isDirty` goes back to `false` after
    // submission
  });

  return { onSubmit, ...form };
};

export const NoteContentEdit: FC<WithClassName> = ({ className }) => {
  useRenderLogger("NoteContentEdit");

  const { onSubmit, register, formState } = useNoteContentEditForm();
  const showLoader = useLoadingStateDebounce(formState.isSubmitting);
  const contentHasNotBeenChanged = !formState.isDirty;

  return (
    <form
      className={cx("flex flex-col items-end", className)}
      onSubmit={onSubmit}
    >
      <Textarea {...register("content")} className="mb-2 w-full" />
      <Button
        colorScheme="primary"
        type="submit"
        isLoading={showLoader}
        disabled={contentHasNotBeenChanged}
      >
        Save
      </Button>
    </form>
  );
};
