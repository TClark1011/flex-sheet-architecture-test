import { useEffect, useRef } from "react";

const composeStyledConsoleLog = (stringStyleCombos: [string, string][]) => {
	const strings = stringStyleCombos.map(([string]) => string);
	const styles = stringStyleCombos.map(([, style]) => style);

	return [strings.map((str) => `%c${str}`).join(""), ...styles];
};

const seededRandomColor = (seed: string) => {
	let hash = 0;
	for (let i = 0; i < seed.length; i++) {
		hash = seed.charCodeAt(i) + ((hash << 5) - hash);
	}
	let color = "#";
	for (let i = 0; i < 3; i++) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.substr(-2);
	}
	return color;
};

const getLogPrinter =
	(componentName: string, extraContext: (string | number)[] = []) =>
	(extraMessage: string) => {
		const componentNameColor = seededRandomColor(componentName);
		console.debug(
			...composeStyledConsoleLog([
				[`[${componentName}`, `color: ${componentNameColor}`],
				...(extraContext.length > 0
					? ([[" (", "color: white;"]] as [string, string][])
					: []),
				...extraContext.map(
					(context, index) =>
						[
							`${context}${index !== extraContext.length - 1 ? "," : ""}`,
							`color: ${seededRandomColor(String(context))};`,
						] as [string, string]
				),
				...(extraContext.length > 0
					? ([[")", "color: white;"]] as [string, string][])
					: []),
				["] ", `color: ${componentNameColor}`],
				[extraMessage, "color: inherit;"],
			])
		);
	};

export const useRenderLogger = (
	componentName: string,
	extraContext: (string | number)[] = []
) => {
	const renderCountRef = useRef(0);
	const loggerRef = useRef(getLogPrinter(componentName, extraContext));

	useEffect(() => {
		renderCountRef.current += 1;

		loggerRef.current(
			renderCountRef.current > 1
				? `rendered ${renderCountRef.current} times`
				: "mounted"
		);
	});

	useEffect(() => {
		const logger = loggerRef.current;
		return () => {
			if (renderCountRef.current > 1) {
				logger("unmounted");
			}
		};
	}, []);
};
