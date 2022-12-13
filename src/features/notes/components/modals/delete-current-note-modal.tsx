import type { ModalProps } from "$ui";
import { Button, Modal, ModalActions } from "$ui";
import { useDeleteNoteMutation } from "@/features/notes/hooks/note-mutation-hooks";
import { noteIdSelectorAtom } from "@/features/notes/stores/note-atoms";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import type { FC } from "react";

export const DeleteCurrentNoteModal: FC<ModalProps> = (modalProps) => {
  const deleteNoteMutator = useDeleteNoteMutation({
    onSettled: modalProps.onClose,
    onSuccess: () => push("/notes"),
  });
  const noteId = useAtomValue(noteIdSelectorAtom);
  const { push } = useRouter();

  return (
    <Modal {...modalProps} title="Delete Note">
      <p>Are you sure you want to delete this note?</p>
      <ModalActions>
        <Button variant="ghost" onClick={modalProps.onClose}>
          Cancel
        </Button>
        <Button
          colorScheme="error"
          isLoading={deleteNoteMutator.isLoading}
          onClick={() => {
            deleteNoteMutator.mutate({ noteId });
          }}
        >
          Delete
        </Button>
      </ModalActions>
    </Modal>
  );
};
