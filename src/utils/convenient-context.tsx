import type { FC, PropsWithChildren } from "react";
import { useContext } from "react";
import { createContext } from "react";

const EMPTY_CONTEXT = Symbol("EMPTY_CONTEXT");

export const createConvenientContext = <T extends Record<string, any>>() => {
	const Context = createContext<T | typeof EMPTY_CONTEXT>(EMPTY_CONTEXT);

	const Provider: FC<PropsWithChildren<T>> = ({ children, ...props }) => (
		<Context.Provider value={props as T}>{children}</Context.Provider>
	);

	const useTheContext = () => {
		const value = useContext(Context);

		if (value === EMPTY_CONTEXT) {
			throw new Error("Context value is empty");
		}

		return value;
	};

	const useTheUnsafeContext = () => {
		const value = useContext(Context);

		if (value === EMPTY_CONTEXT) {
			return undefined;
		}

		return value;
	};

	return [Provider, useTheContext, useTheUnsafeContext] as const;
};
