import { useEffect, useState } from "react";

export const useDisclosureState = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    setIsOpen(initialState);
  }, [initialState]);

  return {
    isOpen,
    onClose: () => {
      setIsOpen(false);
    },
    onOpen: () => {
      setIsOpen(true);
    },
    toggle: () => {
      setIsOpen((prev) => !prev);
    },
  };
};
