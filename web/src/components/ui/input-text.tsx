import { WarningIcon } from "@phosphor-icons/react";
import type { ComponentProps, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const inputVariants = tv({
  slots: {
    container: "flex flex-col gap-1",
    label: "text-[10px]",
    input: "h-12 px-4 rounded-lg border text-sm text-gray-600 ",
    message: "text-sm flex items-center gap-1"
  },
  variants: {
    status: {
      normal: {
        label: "text-gray-400",
        input: "border-gray-300 focus:outline-blue-base",
        message: "text-gray-400"
      },
      error: {
        label: "text-danger",
        input: "border-danger focus:outline-danger",
        message: "text-danger"
      }
    },
  },
  defaultVariants: {
    status: "normal",
  },
});

type InputProps = ComponentProps<"input"> &
  VariantProps<typeof inputVariants> & {
    label: ReactNode;
    message?: ReactNode;
    status?: "normal" | "error";
  };

export function InputText({ label, message, status, className, ...props }: InputProps) {
  const { container, label: labelStyle, input, message: messageStyle } = inputVariants({ status });

  return (
    <div className={container()}>
      {label && <label className={labelStyle()}>{label}</label>}
      <input className={input({ className })} {...props} />
      {message && (
        <span className={messageStyle()}>
          <WarningIcon className="text-red-500" size={15} />
          {message}
        </span>
      )}
    </div>
  );
}