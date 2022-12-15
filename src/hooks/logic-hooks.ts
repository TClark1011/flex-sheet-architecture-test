// Hooks that provide functionality that is scoped
// to the specific functionality of this application

import { useDebouncedValue } from "@/hooks/debounce-hooks";

/**
 * We sometimes apply a very slight debounce to loading
 * states to avoid components very briefly flickering
 * into their loading state. Avoid if possible, its
 * not the worst thing in the world to do this, but if
 * something looks fine without it, don't do it.
 */
export const useLoadingStateDebounce = <T>(value: T) =>
	useDebouncedValue(value, 50);
