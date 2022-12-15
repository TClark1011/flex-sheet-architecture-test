import { FULL_NOTE_STUB } from "@/constants/stubs";
import {
	noteAtom,
	notePermissionAtom,
} from "@/features/notes/stores/note-atoms";
import { useNotePageParams } from "@/logic/page-param-helpers";
import { trpc } from "@/utils/trpc";
import { useHydrateAtoms, useUpdateAtom } from "jotai/utils";
import type { FC } from "react";
import { useEffect } from "react";

const useNoteQuery = () => {
	const { noteId } = useNotePageParams();

	const setNoteData = useUpdateAtom(noteAtom);
	const setNotePermission = useUpdateAtom(notePermissionAtom);

	const {
		data: result = {
			note: FULL_NOTE_STUB,
			permission: "view",
		},
	} = trpc.note.getNote.useQuery({
		noteId,
	});

	useHydrateAtoms([
		[noteAtom, result.note],
		[notePermissionAtom, result.permission],
	]);

	useEffect(() => {
		setNoteData(result.note);
	}, [setNoteData, result.note]);

	useEffect(() => {
		setNotePermission(result.permission);
	}, [setNotePermission, result.permission]);
};

/**
 * Headless component that manages data fetching and syncing
 * fetched data into client state.
 */
export const SingleNoteQueryManager: FC = () => {
	useNoteQuery();

	return null;
};
