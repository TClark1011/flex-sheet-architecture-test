import { useFormControlContext } from "@/packages/ui/hooks/use-form-control";
import {
  extraTextInputBaseClasses,
  textInputSolidVariantClasses,
} from "@/packages/ui/internal/common-classes";
import type { ComponentProps } from "@/packages/ui/internal/ui-utils";
import { colorSchemes, variants } from "@/packages/ui/internal/ui-utils";
import { cva, cx } from "class-variance-authority";
import { forwardRef, useEffect } from "react";

export type TextareaVariant = "ghost" | "solid";

const textareaClassNames = cva(`textarea ${extraTextInputBaseClasses}`, {
  variants: {
    ...colorSchemes({
      primary: cx("textarea-primary"),
      accent: cx("textarea-accent"),
      secondary: cx("textarea-secondary"),
      error: cx("textarea-error"),
      info: cx("textarea-info"),
      success: cx("textarea-success"),
      warning: cx("textarea-warning"),
    }),
    ...variants<TextareaVariant>({
      ghost: cx("textarea-ghost"),
      solid: textInputSolidVariantClasses,
    }),
    bordered: {
      true: cx("textarea-bordered"),
    },
    resizable: {
      false: cx("resize-none"),
    },
    hasError: {
      true: cx("textarea-error"),
    },
  },
  defaultVariants: {
    variant: "solid",
    resizable: false,
  },
});

export type TextareaProps = ComponentProps<
  "textarea",
  typeof textareaClassNames
>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      colorScheme,
      bordered,
      variant,
      className,
      resizable,
      hasError,
      ...props
    },
    ref
  ) => {
    const { inputId, setInputId, errorMessage } = useFormControlContext();

    useEffect(() => {
      if (props.id !== undefined) {
        setInputId(props.id);
      }
    }, [props.id, setInputId]);
    return (
      <textarea
        ref={ref}
        className={cx(
          textareaClassNames({
            ...props,
            colorScheme,
            bordered,
            variant,
            resizable,
            hasError: hasError ?? errorMessage !== undefined,
          }),
          className
        )}
        {...props}
        id={inputId}
      />
    );
  }
);

Textarea.displayName = "Textarea";
