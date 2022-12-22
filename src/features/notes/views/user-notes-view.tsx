import { RootLayout } from "@/components/layouts/root-layout";
import { Badge, Button, Modal, ModalActions } from "$ui";
import type { FC } from "react";
import { useState } from "react";
import { IconPlus, IconTrash } from "@tabler/icons";
import {
	useCreateNoteMutation,
	useDeleteNoteMutation,
} from "@/features/notes/hooks/note-mutation-hooks";
import { trpc } from "@/utils/trpc";
import { useRenderLogger } from "@/hooks/use-render-logger";
import { useRouter } from "next/router";
import { useLoadingStateDebounce } from "@/hooks/logic-hooks";

export const UserNotesView: FC = () => {
	useRenderLogger("UserNotesView");

	const { push } = useRouter();

	const { data: notes = [] } = trpc.note.getCurrentUserNotes.useQuery();

	const { mutate: createNote, isLoading: noteIsBeingCreated } =
		useCreateNoteMutation();

	const { mutate: deleteNote, isLoading: noteIsBeingDeleted } =
		useDeleteNoteMutation({
			onSettled: () => {
				setNoteIdTargetedForDelete(null);
			},
		});
	const showDeleteLoader = useLoadingStateDebounce(noteIsBeingDeleted);

	const [noteIdTargetedForDelete, setNoteIdTargetedForDelete] = useState<
		string | null
	>(null);

	const noteTargetedForDelete = notes.find(
		(note) => note.id === noteIdTargetedForDelete
	);

	const deleteNoteModalOnClose = () => setNoteIdTargetedForDelete(null);

	return (
		<>
			<RootLayout fullWidth>
				<div className="mb-8">
					{notes.length > 0 && (
						<div className="grid grid-cols-[repeat(auto-fill,minmax(3#$00px,1fr))] gap-4">
							{notes.map((note) => (
								<div
									tabIndex={0}
									onClick={() => {
										push(`/note/${note.id}`);
									}}
									key={note.id}
									className="relative cursor-pointer rounded-xl bg-base-300 p-4 vstack-2"
								>
									<Button
										size="xs"
										colorScheme="error"
										shape="circle"
										variant="ghost"
										className="absolute top-2 right-2"
										onClick={(e) => {
											e.stopPropagation();
											setNoteIdTargetedForDelete(note.id);
										}}
									>
										<IconTrash />
									</Button>
									<div className="text-lg font-semibold">{note.title}</div>

									<div className="rounded-md border border-base-content p-1">
										<div className="box-content h-[5ex] w-full text-left leading-[2.5ex] text-gray-500 line-clamp-2">
											{note.content}
										</div>
									</div>

									<div className="flex-wrap hstack-1">
										{note.tags.map((tag) => (
											<Badge key={tag.id}>{tag.name}</Badge>
										))}
									</div>
								</div>
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

			<Modal
				isOpen={!!noteTargetedForDelete}
				onClose={deleteNoteModalOnClose}
				title="Delete Note"
			>
				<p>
					Are you sure you want to delete the note {'"'}
					{noteTargetedForDelete?.title}
					{'"'}?
				</p>
				<ModalActions>
					<Button variant="ghost" onClick={deleteNoteModalOnClose}>
						Cancel
					</Button>
					<Button
						colorScheme="error"
						isLoading={showDeleteLoader}
						onClick={() =>
							deleteNote({
								noteId: noteTargetedForDelete?.id ?? "",
							})
						}
					>
						Delete
					</Button>
				</ModalActions>
			</Modal>
		</>
	);
};
