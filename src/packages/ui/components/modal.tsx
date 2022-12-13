import { Button } from "@/packages/ui/components/button";
import type { ComponentProps } from "@/packages/ui/internal/ui-utils";
import { IconX } from "@tabler/icons";
import { cva, cx } from "class-variance-authority";
import { forwardRef, useRef } from "react";
import { mergeRefs } from "react-merge-refs";

const modalClassNames = cva("modal", {
  variants: {
    isOpen: {
      true: cx("modal-open"),
    },
    position: {
      middle: cx("modal-middle"),
      bottom: cx("modal-bottom"),
    },
    responsive: {
      // "responsive" modal will use the `modal-middle` style
      // on desktop, but switch to `modal-bottom` for mobile
      true: "",
      // we set this in compound variants to make sure it
      // doesn't conflict with the "position" prop
    },
    noBackdrop: {
      true: cx("bg-transparent"),
    },
  },
  defaultVariants: {
    responsive: true,
    noBackdrop: false,
  },
  compoundVariants: [
    {
      // Styling for the `responsive` prop
      position: undefined,
      responsive: true,
      className: [
        cx("modal-bottom"),
        cx("md:modal-middle"),
        cx("[&>.modal-box]:min-h-[80vh]"),
        cx("[&>.modal-box]:md:min-h-[unset]"),
      ].join(" "),
    },
  ],
});

export type ModalProps = ComponentProps<
  "div",
  typeof modalClassNames,
  {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    hideCloseButton?: boolean;
    noCloseOnOverlayClick?: boolean;
  }
>;

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      children,
      position,
      responsive,
      noBackdrop = false,
      className,
      onClose,
      title,
      hideCloseButton = false,
      noCloseOnOverlayClick = false,
      ...props
    },
    ref
  ) => {
    const closeOnOverlayClick = !noCloseOnOverlayClick;
    const showCloseButton = !hideCloseButton;
    const rootElementRef = useRef<HTMLDivElement>();
    return (
      <div
        ref={mergeRefs([ref, rootElementRef])}
        className={cx(
          modalClassNames({
            ...props,
            isOpen,
            position,
            responsive,
            noBackdrop,
          }),
          className
        )}
        onClick={(e) => {
          props.onClick?.(e);
          const overlayWasClicked = e.target === rootElementRef.current;
          if (closeOnOverlayClick && overlayWasClicked) {
            onClose();
          }
        }}
      >
        <div className="modal-box w-full">
          {showCloseButton && (
            <Button
              variant="ghost"
              className="absolute top-1 right-1"
              shape="circle"
              onClick={onClose}
            >
              <IconX />
            </Button>
          )}
          {title && <div className="mb-2 text-lg font-semibold">{title}</div>}

          {children}
        </div>
      </div>
    );
  }
);

Modal.displayName = "Modal";

export const ModalActions = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, children, ...props }, ref) => (
    <div className={cx("modal-action", className)} {...props} ref={ref}>
      {children}
    </div>
  )
);

ModalActions.displayName = "ModalActions";
