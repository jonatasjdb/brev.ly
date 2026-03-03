import { WarningIcon } from "@phosphor-icons/react";
import type { ComponentProps, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const inputVariants = tv({
  slots: {
    container: "flex flex-col gap-1 group",
    label: "text-[10px]",
    prefix: "text-gray-400 select-none mr-0.5",
    inputWrapper: "h-12 px-4 rounded-lg border flex items-center bg-white transition-all ",
    input: "h-12 rounded-lg text-sm text-gray-600 focus:outline-none",
    error: "text-[10px] flex items-center gap-1"
  },
  variants: {
    status: {
      normal: {
        label: "text-gray-400 group-focus-within:text-blue-base",
        inputWrapper: "border-gray-300 focus-within:border-blue-base focus-within:ring-1 focus-within:ring-blue-base",
        error: "text-gray-400"
      },
      error: {
        label: "text-danger",
        inputWrapper: "border-danger",
        error: "text-danger"
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
    error?: ReactNode;
    status?: "normal" | "error";
  };

export function InputText({ label, error, status, prefix, className, ...props }: InputProps) {
  const { container, label: labelStyle, inputWrapper, input: inputStyle, prefix: prefixStyle, error: errorStyle } = inputVariants({ status });

  return (
    <div className={container()}>
      {label && <label className={labelStyle()}>{label}</label>}


      <div className={inputWrapper()}>
        {prefix && <span className={prefixStyle()}>brev.ly/</span>}
        <input className={inputStyle({ className })} {...props} />
      </div>

      {error && (
        <span className={errorStyle()}>
          <WarningIcon className="text-red-500" size={13} />
          {error}
        </span>
      )}
    </div>
  );
}