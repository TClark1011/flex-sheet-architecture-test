import { useEffect, useRef, useState } from "react";

const clearTimeoutIfExists = (timeoutInstance?: NodeJS.Timeout) => {
  timeoutInstance && clearTimeout(timeoutInstance);
};

/**
 * Returns a copy of the passed `value`, that is debounced,
 * meaning that when the source `value` changes, the returned
 * value will not change until the `delay` has passed without
 * any additional updates to the source `value`.
 *
 * NOTE: If using react 18 or higher you should probably use
 * the built-in `useDeferredValue` hook instead. In most use
 * cases that hook will bring the same performance benefits
 * without the delay of the debounce.
 */
export const useDebouncedValue = <T>(value: T, delay: number): T => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const [debouncedState, setDebouncedState] = useState(value);

  useEffect(() => {
    clearTimeoutIfExists(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setDebouncedState(value);
    }, delay);

    return () => {
      clearTimeoutIfExists(timeoutRef.current);
    };
  }, [delay, value]);

  return debouncedState;
};

export const useDebouncedEffect = (
  effect: () => void,
  delay: number,
  deps: any[]
) => {
  // "debounced effect" hook is not trivial to implement
  // because our debouncing method won't just let us debounce
  // the entire dependency array...

  // Track the number of times any of the deps have changed
  const [depChangeCounter, setDepChangeCounter] = useState(0);
  useEffect(() => {
    setDepChangeCounter((v) => v + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const debouncedRunCounter = useDebouncedValue(depChangeCounter, delay);
  // Then we debounce that counter...

  useEffect(() => {
    effect();
    // And run the effect when that debounced counter changes
  }, [debouncedRunCounter, effect]);
};
