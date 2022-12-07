import { trpc } from "@/utils/trpc";
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
) =>
  trpc.note.saveNote.useMutation({
    ...options,
    onError: (...params) => {
      toast.error("Unable to save note");
      return options?.onError?.(...params);
    },
    onSuccess: (...params) => {
      toast.success("Note saved");
      return options?.onSuccess?.(...params);
    },
  });
