import { useCreateTagMutation } from "@/features/notes/hooks/note-mutation-hooks";
import {
	noteIdSelectorAtom,
	noteTagsSelectorAtom,
	tagIdTargetedForDeleteAtom,
	userCanEditNoteSelectorAtom,
} from "@/features/notes/stores/note-atoms";
import { useLoadingStateDebounce } from "@/hooks/logic-hooks";
import { useRenderLogger } from "@/hooks/use-render-logger";
import { Badge, Button, TextInput } from "@/packages/ui";
import type { WithClassName } from "@/types/utility-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus, IconX } from "@tabler/icons";
import { cx } from "class-variance-authority";
import { useAtomValue } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const newTagFormSchema = z.object({
	tagText: z.string(),
});

const newTagFormResolver = zodResolver(newTagFormSchema);

const useNewTagForm = () => {
	const noteId = useAtomValue(noteIdSelectorAtom);
	const { handleSubmit, ...newTagForm } = useForm<
		z.infer<typeof newTagFormSchema>
	>({
		resolver: newTagFormResolver,
		defaultValues: {
			tagText: "",
		},
	});
	const createTagMutation = useCreateTagMutation();

	const showLoader = useLoadingStateDebounce(createTagMutation.isLoading);

	const onSubmit = handleSubmit(async ({ tagText }) => {
		await createTagMutation.mutateAsync({
			noteId,
			tagText,
		});
		newTagForm.reset();
	});

	return { onSubmit, showLoader, ...newTagForm };
};

export const NoteTagsEdit: FC<WithClassName> = ({ className }) => {
	useRenderLogger("NoteTagsEdit");

	const userCanEditNote = useAtomValue(userCanEditNoteSelectorAtom);
	const setTagIdTargetedForDelete = useUpdateAtom(tagIdTargetedForDeleteAtom);
	const tags = useAtomValue(noteTagsSelectorAtom);
	const { register, onSubmit, showLoader, formState } = useNewTagForm();

	return (
		<div
			className={cx(
				"flex w-full flex-col justify-start gap-2 rounded-md border border-base-content p-2",
				className
			)}
		>
			{tags.length === 0 && (
				<p className="mb-2 w-full text-center italic text-slate-400">No tags</p>
			)}
			{tags.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{tags.map((tag) => (
						<Badge
							onClick={() => setTagIdTargetedForDelete(tag.id)}
							className="cursor-pointer"
							tabIndex={0}
							icon={userCanEditNote ? <IconX /> : <></>}
							key={tag.id}
						>
							{tag.name}
						</Badge>
					))}
				</div>
			)}
			{userCanEditNote && (
				<form className="input-group ml-auto w-max" onSubmit={onSubmit}>
					<TextInput
						size="sm"
						aria-label="enter new tag text"
						variant="solid"
						placeholder="Add Tag"
						disabled={formState.isSubmitting}
						{...register("tagText")}
					/>
					<Button shape="circle" size="sm" type="submit" disabled={showLoader}>
						<IconPlus />
					</Button>
				</form>
			)}
		</div>
	);
};
