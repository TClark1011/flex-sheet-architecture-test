import type { ComponentProps } from "@/packages/ui/internal/ui-utils";
import { cva, cx } from "class-variance-authority";
import { forwardRef } from "react";

const swapClassName = cva("swap", {
  variants: {
    transition: {
      rotate: cx("swap-rotate"),
      flip: cx("swap-flip"),
    },
  },
});

export type SwapProps = ComponentProps<
  "input",
  typeof swapClassName,
  {
    on: JSX.Element;
    off: JSX.Element;
  }
>;

export const Swap = forwardRef<HTMLInputElement, SwapProps>(
  ({ on, off, transition, className, ...props }, ref) => (
    <label className={cx(swapClassName({ transition }), className)}>
      <input type="checkbox" {...props} ref={ref} />
      <div className="swap-on">{on}</div>
      <div className="swap-off">{off}</div>
    </label>
  )
);

Swap.displayName = "Swap";
