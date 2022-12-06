import type { ComponentProps } from "@/packages/ui/internal/ui-utils";
import { colorSchemes } from "@/packages/ui/internal/ui-utils";
import { cva, cx } from "class-variance-authority";
import type { FC, PropsWithChildren } from "react";
import type {} from "ts-essentials";

const navbarClassName = cva("navbar", {
  variants: {
    ...colorSchemes({
      primary: cx("bg-primary text-primary-content"),
      accent: cx("bg-accent text-accent-content"),
      secondary: cx("bg-secondary text-secondary-content"),
      error: cx("bg-error text-error-content"),
      info: cx("bg-info text-info-content"),
      success: cx("bg-success text-success-content"),
      warning: cx("bg-warning text-warning-content"),
    }),
  },
});

export type NavbarProps = ComponentProps<
  "div",
  typeof navbarClassName,
  PropsWithChildren & {
    startContent?: JSX.Element;
    centerContent?: JSX.Element;
    endContent?: JSX.Element;
  }
>;

export const Navbar: FC<NavbarProps> = ({
  colorScheme,
  children,
  className,
  startContent,
  centerContent,
  endContent,
  ...props
}) => (
  <div className={cx(navbarClassName({ colorScheme }), className)} {...props}>
    {startContent && <div className="navbar-start">{startContent}</div>}
    {centerContent && <div className="navbar-center">{centerContent}</div>}
    {endContent && <div className="navbar-end">{endContent}</div>}
    {children}
  </div>
);
