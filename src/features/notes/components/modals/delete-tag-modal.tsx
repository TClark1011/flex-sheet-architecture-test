import {
	tagIdTargetedForDeleteAtom,
	tagTargetedForDeleteSelectorAtom,
} from "@/features/notes/stores/note-atoms";
import type { ModalProps } from "$ui";
import { Button, ModalActions } from "$ui";
import { Modal } from "$ui";
import { useAtomValue } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import type { FC } from "react";
import { useDeleteTagMutation } from "@/features/notes/hooks/note-mutation-hooks";
import { useNotePageParams } from "@/logic/page-param-helpers";
import { useRenderLogger } from "@/hooks/use-render-logger";

const useDeleteTagModalState = (): ModalProps => {
	const setTagIdTargetedForDelete = useUpdateAtom(tagIdTargetedForDeleteAtom);
	const tagTargetedForDelete = useAtomValue(tagTargetedForDeleteSelectorAtom);

	return {
		isOpen: !!tagTargetedForDelete,
		onClose: () => setTagIdTargetedForDelete(null),
	};
};

export const DeleteTagModal: FC = () => {
	useRenderLogger("DeleteTagModal");

	const modalStateProps = useDeleteTagModalState();
	const tagId = useAtomValue(tagIdTargetedForDeleteAtom);
	const { noteId } = useNotePageParams();
	const { mutateAsync: deleteTag, isLoading: tagIsBeingDeleted } =
		useDeleteTagMutation();

	return (
		<Modal {...modalStateProps} title="Delete tag?">
			<p>Are you sure you want to delete this tag?</p>
			<ModalActions>
				<Button variant="ghost" disabled={tagIsBeingDeleted}>
					Cancel
				</Button>
				<Button
					colorScheme="error"
					isLoading={tagIsBeingDeleted}
					onClick={() => {
						if (tagId) {
							deleteTag({
								noteId,
								tagId,
							}).then(modalStateProps.onClose);
						}
					}}
				>
					Delete
				</Button>
			</ModalActions>
		</Modal>
	);
};
