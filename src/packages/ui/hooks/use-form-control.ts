import { createConvenientContext } from "@/utils/convenient-context";
import { useId, useState } from "react";

export type UseFormControlParam = {
	errorMessage?: string;
};

export const useFormControl = ({ errorMessage }: UseFormControlParam) => {
	const [inputId, setInputId] = useState(useId());

	return { inputId, setInputId, errorMessage };
};

const [FormControlProvider, , useBaseFormControlContext] =
	createConvenientContext<ReturnType<typeof useFormControl>>();

export { FormControlProvider };

export const useFormControlContext = () => {
	const data = useBaseFormControlContext();
	const fallback = useFormControl({});

	if (!data) return fallback;

	return data;
};
