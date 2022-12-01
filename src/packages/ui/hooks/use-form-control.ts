import { createConvenientContext } from "@/utils/convenient-context";
import { useId, useState } from "react";

export type UseFormControlParam = {
  errorMessage?: string;
};

export const useFormControl = ({ errorMessage }: UseFormControlParam) => {
  const [inputId, setInputId] = useState(useId());

  return { inputId, setInputId, errorMessage };
};

export const [FormControlProvider, _, useFormControlContext] =
  createConvenientContext<ReturnType<typeof useFormControl>>();
