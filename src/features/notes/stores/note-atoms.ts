import { FULL_NOTE_STUB } from "@/constants/stubs";
import { createAtom, createSelectorAtom } from "$jotai";
import type { ContentPermission } from "@/types/utility-types";

export const noteAtom = createAtom(FULL_NOTE_STUB);
export const noteIdSelectorAtom = createSelectorAtom(
  noteAtom,
  (note) => note.id
);
export const noteContentSelectorAtom = createSelectorAtom(
  noteAtom,
  (note) => note.content
);
export const noteTitleSelectorAtom = createSelectorAtom(
  noteAtom,
  (note) => note.title
);
export const noteIsPublicSelectorAtom = createSelectorAtom(
  noteAtom,
  (note) => note.public
);
export const noteTagsSelectorAtom = createSelectorAtom(
  noteAtom,
  (note) => note.tags
);

export const notePermissionAtom = createAtom<ContentPermission>("view");
export const userCanEditNoteSelectorAtom = createSelectorAtom(
  notePermissionAtom,
  (permission) => permission === "edit"
);

export const tagIdTargetedForDeleteAtom = createAtom<string | null>(null);
export const tagTargetedForDeleteSelectorAtom = createAtom((get) => {
  const targetedTagId = get(tagIdTargetedForDeleteAtom);
  const noteTags = get(noteTagsSelectorAtom);

  return noteTags.find((tag) => tag.id === targetedTagId);
});
