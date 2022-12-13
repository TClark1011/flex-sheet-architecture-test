import { useFormControlContext } from "@/packages/ui/hooks/use-form-control";
import {
	extraTextInputBaseClasses,
	textInputSolidVariantClasses,
} from "@/packages/ui/internal/common-classes";
import type { ComponentProps } from "@/packages/ui/internal/ui-utils";
import { variants, sizes, colorSchemes } from "@/packages/ui/internal/ui-utils";
import { cva, cx } from "class-variance-authority";
import { forwardRef, useEffect } from "react";

export type TextInputVariants = "ghost" | "solid";

const textInputClassNames = cva(`input ${extraTextInputBaseClasses}`, {
	variants: {
		...colorSchemes({
			primary: cx("input-primary"),
			accent: cx("input-accent"),
			secondary: cx("input-secondary"),
			error: cx("input-error"),
			info: cx("input-info"),
			success: cx("input-success"),
			warning: cx("input-warning"),
		}),
		...sizes({
			xs: cx("input-xs"),
			sm: cx("input-sm"),
			md: cx("input-md"),
			lg: cx("input-lg"),
		}),
		...variants<TextInputVariants>({
			solid: textInputSolidVariantClasses,
			ghost: cx("input-ghost"),
		}),
		hasError: {
			true: cx("input-error"),
		},
		bordered: {
			true: cx("input-bordered"),
		},
	},
	defaultVariants: {
		variant: "solid",
		size: "md",
	},
});

export type TextInputProps = ComponentProps<
	"input",
	typeof textInputClassNames
>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
	(
		{ className, size, variant, bordered, hasError, colorScheme, ...props },
		ref
	) => {
		const { inputId, setInputId, errorMessage } = useFormControlContext();

		useEffect(() => {
			if (props.id !== undefined) {
				setInputId(props.id);
			}
		}, [props.id, setInputId]);

		return (
			<input
				{...props}
				ref={ref}
				id={inputId}
				className={cx(
					textInputClassNames({
						hasError: hasError ?? errorMessage !== undefined,
						size,
						variant,
						bordered,
						colorScheme,
					}),
					className
				)}
			/>
		);
	}
);

TextInput.displayName = "TextInput";
