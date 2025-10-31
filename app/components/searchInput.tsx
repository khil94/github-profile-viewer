"use client";

import { X } from "lucide-react";
import { HTMLProps } from "react";

interface props extends Omit<HTMLProps<HTMLFormElement>, "onSubmit"> {
  className?: string;
  onSubmit?: (val: string) => void;
  value: string;
  onChangeValue: (val: string) => void;
}

export default function SearchInput({
  className,
  onSubmit,
  onChangeValue,
  value,
  ...rest
}: props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onChangeValue("");
        onSubmit && onSubmit(value);
      }}
      {...rest}
      className={`relative text-black ${className}`}
    >
      <input
        className={`w-full pr-[20%] md:pr-[18%] bg-white border-2 border-border rounded-4xl focus:outline-2 outline-accent-border p-[5%]`}
        value={value}
        onChange={(e) => {
          const temp = e.target.value.trim();
          onChangeValue(temp);
        }}
      />
      {value.length !== 0 && (
        <X
          onClick={() => {
            onChangeValue("");
          }}
          className="hover:cursor-pointer h-1/4 absolute opacity-60 top-1/2 -translate-y-1/2 right-[5%]"
        />
      )}
    </form>
  );
}
