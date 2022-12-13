import type { ChangeEvent } from "react";
import { useEffect } from "react";
import { useState, useCallback } from "react";

export const useInputState = (initialValue = "") => {
  const [inputState, setInputState] = useState(initialValue);

  useEffect(() => {
    setInputState(initialValue);
  }, [initialValue]);

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

export const useCheckboxState = (initialState = false) => {
  const [isChecked, setIsChecked] = useState(initialState);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const newState = event.target.checked;

    setIsChecked(newState);
  }, []);

  useEffect(() => {
    setIsChecked(initialState);
  }, [initialState]);

  const checkboxProps = {
    onChange,
    checked: isChecked,
  } satisfies JSX.IntrinsicElements["input"];

  return [isChecked, checkboxProps, { setState: setIsChecked }] as const;
};
