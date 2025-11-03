"use client";

import { X } from "lucide-react";
import { HTMLProps } from "react";

interface props extends Omit<HTMLProps<HTMLFormElement>, "onSubmit"> {
  className?: string;
  onSubmit?: (val: string) => void;
  value: string;
  onChangeValue: (val: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  className,
  onSubmit,
  onChangeValue,
  value,
  placeholder,
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
      className={`relative rounded-2xl ${className}`}
    >
      <input
        className={`w-full pr-[20%] rounded-2xl text-on-primary-container md:pr-[18%] bg-primary-container border-2 border-border focus:outline-2 outline-accent-border p-[3%]`}
        value={value}
        placeholder={placeholder}
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
          className="md:hover:cursor-pointer md:hover:opacity-100 h-1/4 absolute opacity-60 top-1/2 -translate-y-1/2 right-[5%]"
        />
      )}
    </form>
  );
}
