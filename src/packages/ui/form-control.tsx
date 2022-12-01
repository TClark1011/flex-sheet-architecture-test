import {
  FormControlProvider,
  useFormControl,
} from "@/packages/ui/hooks/use-form-control";
import type { ComponentProps } from "@/packages/ui/ui-utils";
import { cva, cx } from "class-variance-authority";
import type { PropsWithChildren } from "react";
import { forwardRef } from "react";

const formControlClassNames = cva("form-control");

export type FormControlProps = PropsWithChildren<
  ComponentProps<
    "div",
    typeof formControlClassNames,
    {
      label?: string;
      errorMessage?: string;
    }
  >
>;

export const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
  ({ children, label, errorMessage, ...props }, ref) => {
    const { inputId, ...providerProps } = useFormControl({
      errorMessage,
    });

    return (
      <FormControlProvider inputId={inputId} {...providerProps}>
        <div
          {...props}
          className={cx(formControlClassNames(), props.className)}
          ref={ref}
        >
          {label && (
            <label htmlFor={inputId} className="label">
              <span className="label-text">{label}</span>
            </label>
          )}
          {children}
          {errorMessage && (
            <label className="label">
              <span className="label-text-alt text-error">{errorMessage}</span>
            </label>
          )}
        </div>
      </FormControlProvider>
    );
  }
);

FormControl.displayName = "FormControl";
