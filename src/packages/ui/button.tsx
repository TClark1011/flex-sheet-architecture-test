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
      lg: "btn-lg",
      sm: "btn-sm",
      xs: "btn-xs",
      md: "btn-md",
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
});

export type ButtonProps = PropsWithChildren<
  ComponentProps<"button", typeof buttonClassName>
>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref) => (
    <button
      {...props}
      className={cx(buttonClassName(props), className)}
      ref={ref}
    >
      {children}
    </button>
  )
);

Button.displayName = "Button";
