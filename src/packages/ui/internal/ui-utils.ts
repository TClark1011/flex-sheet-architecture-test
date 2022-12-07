import type {
  ExcludeFromValues,
  EmptyObject,
  StringThatIncludes,
} from "@/types/utility-types";
import type { VariantProps } from "class-variance-authority";
import type { Merge, Dictionary } from "ts-essentials";

export type ThemeBrandColor = "primary" | "secondary" | "accent";
export type ThemeStateColor = "success" | "warning" | "error" | "info";
export type ThemeColor = ThemeBrandColor | ThemeStateColor;

// Names of CSS variables that are created for each color
export type ThemeBrandColorVariableName = "p" | "s" | "a";
export type ThemeStateColorVariableName = "su" | "wa" | "er" | "in";
export type ThemeColorVariableNameModifiers = "f" | "c"; // f = "focus", c = "content"
export type ThemeColorVariableName = `${
  | ThemeBrandColorVariableName
  | ThemeStateColorVariableName}${ThemeColorVariableNameModifiers | ""}`;

export type ThemeSize = "xs" | "sm" | "md" | "lg";

export const colorSchemes = <ExtraColors extends string>(
  classes: Record<ThemeColor | ExtraColors, string>
) => ({
  colorScheme: classes,
});

export const variants = <Variants extends string>(
  classes: Record<Variants, string>
) => ({
  variant: classes,
});

export const sizes = (classes: Record<ThemeSize, string>) => ({
  size: classes,
});

export type ComponentProps<
  RootElement extends keyof JSX.IntrinsicElements,
  ClassGenerator extends (...params: any[]) => any,
  ExtraProps extends Dictionary<any> = EmptyObject
> = Merge<
  JSX.IntrinsicElements[RootElement],
  ExcludeFromValues<VariantProps<ClassGenerator>, null> & ExtraProps
>;

type CSSVariableName<Name extends string> = `--${Name}`;
type CSSVariableUsage<Name extends string> = `var(${CSSVariableName<Name>}${
  | `,${string}`
  | ""})`; // Allow for use with or without fallback value

export type StringThatUsesThemeVariable = StringThatIncludes<
  CSSVariableUsage<ThemeColorVariableName>
>;
// This is useful if we ever need to manually reference theme CSS
// variables in component styles
