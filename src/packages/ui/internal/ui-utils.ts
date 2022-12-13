import type {
  ExcludeFromValues,
  EmptyObject,
  StringThatIncludes,
} from "@/types/utility-types";
import type { VariantProps } from "class-variance-authority";
import type { Merge, Dictionary } from "ts-essentials";

type ClassNameRecord<Keys extends string> = Record<Keys, string>;

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

export function colorSchemes(
  classes: ClassNameRecord<ThemeColor>
): Record<"colorScheme", ClassNameRecord<ThemeColor>>; // Signature for when no extra colors are provided
export function colorSchemes<ExtraColors extends string>(
  classes: ClassNameRecord<ThemeColor | ExtraColors>
): Record<"colorScheme", ClassNameRecord<ThemeColor | ExtraColors>>; // Signature for when extra colors are provided
export function colorSchemes<ExtraColors extends string>(
  classes:
    | ClassNameRecord<ThemeColor>
    | ClassNameRecord<ThemeColor | ExtraColors>
) {
  return {
    colorScheme: classes,
  };
}

// export const colorSchemes = <
//   ExtraColors extends string | undefined = undefined
// >(
//   classes: Record<ThemeColor, string>,
//   extraColorClasses?: ExtraColors extends string
//     ? Record<ExtraColors, string>
//     : undefined
// ) => ({
//   colorScheme: {
//     ...classes,
//     ...extraColorClasses,2
//   },
// });

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
  ClassGenerator extends (...params: any[]) => any = (p: EmptyObject) => any,
  ExtraProps extends Dictionary<any> = EmptyObject
> = Omit<
  Merge<
    JSX.IntrinsicElements[RootElement],
    ExcludeFromValues<VariantProps<ClassGenerator>, null> & ExtraProps
  >,
  "ref"
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
