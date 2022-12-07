import type { ComponentProps } from "@/packages/ui/internal/ui-utils";
import { colorSchemes, sizes } from "@/packages/ui/internal/ui-utils";
import { cva, cx } from "class-variance-authority";
import { forwardRef } from "react";
import type { StrictOmit } from "ts-essentials";

const toggleClassNames = cva("toggle", {
  variants: {
    ...colorSchemes({
      primary: cx("toggle-primary"),
      secondary: cx("toggle-secondary"),
      accent: cx("toggle-accent"),
      error: cx("toggle-error"),
      warning: cx("toggle-warning"),
      success: cx("toggle-success"),
      info: cx("toggle-info"),
    }),
    ...sizes({
      xs: cx("toggle-xs"),
      sm: cx("toggle-sm"),
      md: cx("toggle-md"),
      lg: cx("toggle-lg"),
    }),
  },
});

export type ToggleProps = StrictOmit<ComponentProps<"input", typeof toggleClassNames>, "type">;

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ colorScheme, size, className, ...props }, ref) => (
    <input
      ref={ref}
			type="checkbox"
      className={cx(toggleClassNames({ colorScheme, size }), className)}
      {...props}
    />
  )
);

Toggle.displayName = "Toggle";
