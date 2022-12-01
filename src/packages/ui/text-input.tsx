import { useFormControlContext } from "@/packages/ui/hooks/use-form-control";
import type { ComponentProps } from "@/packages/ui/ui-utils";
import { sizes } from "@/packages/ui/ui-utils";
import { variants } from "@/packages/ui/ui-utils";
import { colorSchemes } from "@/packages/ui/ui-utils";
import { cva, cx } from "class-variance-authority";
import { forwardRef, useEffect } from "react";

export type TextInputVariants = "ghost" | "bordered";

const textInputClassNames = cva("input", {
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
      bordered: cx("input-bordered"),
      ghost: cx("input-ghost"),
    }),
    hasError: {
      true: cx("input-error"),
    },
  },
  defaultVariants: {
    variant: "bordered",
  },
});

export type TextInputProps = ComponentProps<
  "input",
  typeof textInputClassNames
>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, ...props }, ref) => {
    const formControlProps = useFormControlContext();

    useEffect(() => {
      if (props.id && formControlProps) {
        formControlProps.setInputId(props.id);
      }
    }, [props.id, formControlProps]);

    return (
      <input
        {...props}
        ref={ref}
        id={formControlProps?.inputId ?? props.id}
        className={cx(
          textInputClassNames({
            hasError: !!formControlProps?.errorMessage,
            ...props,
          }),
          className
        )}
      />
    );
  }
);

TextInput.displayName = "TextInput";
