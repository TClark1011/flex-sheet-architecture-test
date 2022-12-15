import { trpc } from "@/utils/trpc";
import { A, D } from "@mobily/ts-belt";
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
				const result = await options?.onSuccess?.(data, ...otherParams);
				await push(`note/${data.id}`);
				return result;
			},
		});
	};

export const useDeleteNoteMutation: typeof trpc.note.deleteNote.useMutation = (
	options
) => {
	const trpcHelpers = trpc.useContext();
	return trpc.note.deleteNote.useMutation({
		...options,
		onError: (...params) => {
			toast.error("Unable to delete note");
			return options?.onError?.(...params);
		},
		onSuccess: (data, ...params) => {
			trpcHelpers.note.getCurrentUserNotes.setData(
				undefined,
				(currentNotes = []) =>
					currentNotes.filter((note) => note.id !== data.id)
			);
			// We remove the deleted note from the data for the query that fetches all notes
			return options?.onSuccess?.(data, ...params);
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
				produce((draftResult) => {
					if (draftResult?.note) {
						draftResult.note = D.merge(draftResult.note, newData);
					}
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
				produce((result) => {
					if (result?.note) {
						result.note.tags.push(addedTag);
					}
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
					produce((result) => {
						if (result?.note) {
							result.note.tags = A.reject(
								result.note.tags,
								(tag) => tag.id === removedTag.id
							);
						}
					})
				);
				// We insert the newly mutated note data into the
				// the data for the query that fetches that note

				return options?.onSuccess?.(removedTag, input, ...params);
			},
		});
	};
