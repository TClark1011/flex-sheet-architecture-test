import type { ExcludeNullFromValues } from "@/types/utility-types";
import type { VariantProps } from "class-variance-authority";

export type ThemeBrandColor = "primary" | "secondary" | "accent";
export type ThemeStateColor = "success" | "warning" | "error" | "info";
export type ThemeColor = ThemeBrandColor | ThemeStateColor;

export type ThemeSize = "xs" | "sm" | "md" | "lg";

export const colorSchemes = (classes: Record<ThemeColor, string>) => ({
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
  ExtraProps extends Record<string, unknown> = Record<never, never>
> = JSX.IntrinsicElements[RootElement] &
  ExcludeNullFromValues<VariantProps<ClassGenerator>> &
  ExtraProps;
