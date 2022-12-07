import type { ChangeEvent } from "react";
import { useState, useCallback } from "react";

export const useInputState = (initialValue = "") => {
  const [inputState, setInputState] = useState(initialValue);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInputState(event.target.value);
    },
    []
  );

  return [
    inputState,
    { onChange, value: inputState },
    { setState: setInputState },
  ] as const;
};
