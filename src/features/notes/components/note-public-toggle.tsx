import { useSaveNoteMutation } from "@/features/notes/hooks/note-mutation-hooks";
import {
	noteIdSelectorAtom,
	noteIsPublicSelectorAtom,
} from "@/features/notes/stores/note-atoms";
import { useCheckboxState } from "@/hooks/use-input-state";
import { Toggle } from "$ui";
import { useAtomValue } from "jotai";
import type { FC } from "react";
import { useEffect } from "react";
import type { WithClassName } from "@/types/utility-types";
import { cx } from "class-variance-authority";
import { useLoadingStateDebounce } from "@/hooks/logic-hooks";
import { useRenderLogger } from "@/hooks/use-render-logger";

const useNotePublicToggleToggleProps = () => {
	const noteId = useAtomValue(noteIdSelectorAtom);
	const noteIsPublic = useAtomValue(noteIsPublicSelectorAtom);

	const { mutateAsync: saveNote, isLoading: noteIsSaving } =
		useSaveNoteMutation();
	const debouncedNoteIsSaving = useLoadingStateDebounce(noteIsSaving);

	const [newPublicStatus, toggleProps] = useCheckboxState(noteIsPublic);

	useEffect(() => {
		if (newPublicStatus !== noteIsPublic && !noteIsSaving) {
			saveNote({
				noteId,
				data: {
					public: newPublicStatus,
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newPublicStatus]);

	return {
		...toggleProps,
		disabled: debouncedNoteIsSaving,
	};
};

export const NotePublicToggle: FC<WithClassName> = ({ className }) => {
	useRenderLogger("NotePublicToggle");

	const toggleProps = useNotePublicToggleToggleProps();

	return (
		<div className={cx("items-center hstack-2", className)}>
			<span>Public</span>
			<Toggle colorScheme="success" {...toggleProps} />
		</div>
	);
};
