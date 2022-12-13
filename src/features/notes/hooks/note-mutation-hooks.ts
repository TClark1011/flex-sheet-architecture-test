import { FULL_NOTE_STUB } from "@/constants/stubs";
import { trpc } from "@/utils/trpc";
import produce from "immer";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

export const useCreateNoteMutation: typeof trpc.note.createNewNote.useMutation =
  (options) => {
    const { push } = useRouter();

    return trpc.note.createNewNote.useMutation({
      ...options,
      onError: (...params) => {
        toast.error("Unable to create new note");
        return options?.onError?.(...params);
      },
      onSuccess: async (data, ...otherParams) => {
        const result = options?.onSuccess?.(data, ...otherParams);
        await push(`note/${data.id}`);
        return result;
      },
    });
  };

export const useSaveNoteMutation: typeof trpc.note.saveNote.useMutation = (
  options
) => {
  const trpcHelpers = trpc.useContext();
  return trpc.note.saveNote.useMutation({
    ...options,
    onError: (...params) => {
      toast.error("Unable to save note");
      return options?.onError?.(...params);
    },
    onSuccess: (newData, ...params) => {
      toast.success("Note saved");
      trpcHelpers.note.getNote.setData(
        {
          noteId: newData.id,
        },
        (previousData) => ({
          ...(previousData ?? FULL_NOTE_STUB),
          ...newData,
        })
      );
      // We insert the newly mutated note data into the
      // the data for the query that fetches that note

      return options?.onSuccess?.(newData, ...params);
    },
  });
};

export const useCreateTagMutation: typeof trpc.note.addTagToNote.useMutation = (
  options
) => {
  const trpcHelpers = trpc.useContext();
  return trpc.note.addTagToNote.useMutation({
    ...options,
    onError: (...params) => {
      toast.error("Unable to add tag to note");
      return options?.onError?.(...params);
    },
    onSuccess: (addedTag, input, ...params) => {
      trpcHelpers.note.getNote.setData(
        {
          noteId: input.noteId,
        },
        (previousData = FULL_NOTE_STUB) =>
          produce(previousData, (draftNote) => {
            draftNote.tags.push(addedTag);
          })
      );
      // We insert the newly mutated note data into the
      // the data for the query that fetches that note

      return options?.onSuccess?.(addedTag, input, ...params);
    },
  });
};

export const useDeleteTagMutation: typeof trpc.note.removeTagFromNote.useMutation =
  (options) => {
    const trpcHelpers = trpc.useContext();
    return trpc.note.removeTagFromNote.useMutation({
      ...options,
      onError: (...params) => {
        toast.error("Unable to remove tag from note");
        return options?.onError?.(...params);
      },
      onSuccess: (removedTag, input, ...params) => {
        trpcHelpers.note.getNote.setData(
          {
            noteId: input.noteId,
          },
          (previousData = FULL_NOTE_STUB) =>
            produce(previousData, (draftNote) => {
              draftNote.tags = draftNote.tags.filter(
                (tag) => tag.id !== removedTag.id
              );
            })
        );
        // We insert the newly mutated note data into the
        // the data for the query that fetches that note

        return options?.onSuccess?.(removedTag, input, ...params);
      },
    });
  };
