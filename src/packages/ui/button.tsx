import type { ComponentProps } from "@/packages/ui/ui-utils";
import { colorSchemes, sizes, variants } from "@/packages/ui/ui-utils";
import { cva, cx } from "class-variance-authority";
import type { PropsWithChildren } from "react";
import { forwardRef } from "react";

export type ButtonVariant = "ghost" | "link" | "outline" | "glass";

const buttonClassName = cva("btn active:animate-pulse", {
  variants: {
    ...colorSchemes({
      primary: cx("btn-primary "),
      accent: cx("btn-accent"),
      secondary: cx("btn-secondary"),
      error: cx("btn-error"),
      info: cx("btn-info"),
      success: cx("btn-success"),
      warning: cx("btn-warning"),
    }),
    ...variants<ButtonVariant>({
      ghost: cx("btn-ghost"),
      link: cx("btn-link"),
      outline: cx("btn-outline"),
      glass: cx("glass"),
    }),
    ...sizes({
      xs: cx("btn-xs [&>svg]:size-4 gap-0.5"),
      sm: cx("btn-sm [&>svg]:size-5 gap-1"),
      md: cx("btn-md [&>svg]:size-6 gap-1.5"),
      lg: cx("btn-lg [&>svg]:size-7 gap-2"),
    }),
    isLoading: {
      true: cx("loading"),
    },
    disabled: {
      true: cx("btn-disabled"),
    },
    noAnimation: {
      true: cx("no-animation"),
    },
    shape: {
      square: cx("btn-square"),
      circle: cx("btn-circle"),
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type ButtonProps = PropsWithChildren<
  ComponentProps<
    "button",
    typeof buttonClassName,
    {
      leftIcon?: JSX.Element;
      rightIcon?: JSX.Element;
    }
  >
>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, leftIcon, rightIcon, ...props }, ref) => (
    <button
      {...props}
      className={cx(buttonClassName(props), className)}
      ref={ref}
    >
      {leftIcon}
      <span>{children}</span>
      {rightIcon}
    </button>
  )
);

Button.displayName = "Button";
