import type {
  ComponentProps,
  StringThatUsesThemeVariable,
} from "@/packages/ui/internal/ui-utils";
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
    disabled: {
      // Counter the default daisyui disabled toggle styles
      true: [
        cx("checked:![--togglehandleborder:0_0]"), // remove inner toggle handle border
        cx("checked:!bg-[hsl(var(--scheme-color)_/_var(--tw-bg-opacity))]"), // background color
        cx(
          "checked:!border-[hsl(var(--scheme-color)_/_var(--tw-border-opacity))]"
        ), // border color
      ].join(" "),
    },
  },
  compoundVariants: [
    // Use darkened color when toggle is disabled instead of default
    // daisyui grayed out styles
    {
      colorScheme: "primary",
      disabled: true,
      className: cx(
        "[--scheme-color:var(--p)]" satisfies StringThatUsesThemeVariable
      ),
    },
    {
      colorScheme: "secondary",
      disabled: true,
      className: cx(
        "[--scheme-color:var(--s)]" satisfies StringThatUsesThemeVariable
      ),
    },
    {
      colorScheme: "accent",
      disabled: true,
      className: cx(
        "[--scheme-color:var(--a)]" satisfies StringThatUsesThemeVariable
      ),
    },
    {
      colorScheme: "error",
      disabled: true,
      className: cx(
        "[--scheme-color:var(--er)]" satisfies StringThatUsesThemeVariable
      ),
    },
    {
      colorScheme: "warning",
      disabled: true,
      className: cx(
        "[--scheme-color:var(--wa)]" satisfies StringThatUsesThemeVariable
      ),
    },
    {
      colorScheme: "info",
      disabled: true,
      className: cx(
        "[--scheme-color:var(--in)]" satisfies StringThatUsesThemeVariable
      ),
    },
    {
      colorScheme: "success",
      disabled: true,
      className: cx(
        "[--scheme-color:var(--su)]" satisfies StringThatUsesThemeVariable
      ),
    },
  ],
});

export type ToggleProps = StrictOmit<
  ComponentProps<"input", typeof toggleClassNames>,
  "type"
>;

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ colorScheme, size, className, ...props }, ref) => (
    <input
      ref={ref}
      type="checkbox"
      className={cx(
        toggleClassNames({ ...props, colorScheme, size }),
        className
      )}
      {...props}
    />
  )
);

Toggle.displayName = "Toggle";
