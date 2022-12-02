import { useFormControlContext } from "@/packages/ui/hooks/use-form-control";
import type { ComponentProps } from "@/packages/ui/internal/ui-utils";
import { variants, sizes, colorSchemes } from "@/packages/ui/internal/ui-utils";
import { cva, cx } from "class-variance-authority";
import { forwardRef, useEffect } from "react";

export type TextInputVariants = "ghost" | "solid";

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
      solid: "", // solid is default so we don't need any extra classes
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
  ({ className, size, variant, bordered, hasError, ...props }, ref) => {
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
        id={props.id ?? formControlProps?.inputId}
        className={cx(
          textInputClassNames({
            hasError: hasError ?? !!formControlProps?.errorMessage,
            size,
            variant,
            bordered,
          }),
          className
        )}
      />
    );
  }
);

TextInput.displayName = "TextInput";
