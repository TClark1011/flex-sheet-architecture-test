import type { ComponentProps } from "@/packages/ui/ui-utils";
import { colorSchemes, sizes, variants } from "@/packages/ui/ui-utils";
import { cva, cx } from "class-variance-authority";
import type { PropsWithChildren } from "react";
import { forwardRef } from "react";

export type ButtonVariant = "ghost" | "link" | "outline" | "glass";

const buttonClassName = cva("btn", {
  variants: {
    ...colorSchemes({
      primary: "btn-primary",
      accent: "btn-accent",
      secondary: "btn-secondary",
      error: "btn-error",
      info: "btn-info",
      success: "btn-success",
      warning: "btn-warning",
    }),
    ...variants<ButtonVariant>({
      ghost: "btn-ghost",
      link: "btn-link",
      outline: "btn-outline",
      glass: "glass",
    }),
    ...sizes({
      xs: "btn-xs [&>svg]:size-4 gap-0.5",
      sm: "btn-sm [&>svg]:size-5 gap-1",
      md: "btn-md [&>svg]:size-6 gap-1.5",
      lg: "btn-lg [&>svg]:size-7 gap-2",
    }),
    isLoading: {
      true: "loading",
    },
    disabled: {
      true: "btn-disabled",
    },
    noAnimation: {
      true: "no-animation",
    },
    shape: {
      square: "btn-square",
      circle: "btn-circle",
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
