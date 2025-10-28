"use client";

import { X } from "lucide-react";
import { redirect } from "next/navigation";
import { HTMLProps, useState } from "react";

interface props extends HTMLProps<HTMLFormElement> {
  className?: string;
}

export default function SearchInput({ className, ...rest }: props) {
  const [val, setVal] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setVal("");
        redirect(`/users/${val}`);
      }}
      {...rest}
      className={`relative text-black ${className}`}
    >
      <input
        className={`w-full pr-[20%] md:pr-[18%] bg-white border-2 border-border rounded-4xl focus:outline-2 outline-accent-border p-[5%]`}
        value={val}
        onChange={(e) => {
          setVal(e.target.value.trim());
        }}
      />
      {val.length !== 0 && (
        <X
          onClick={() => {
            setVal("");
          }}
          className="hover:cursor-pointer h-1/4 absolute opacity-60 top-1/2 -translate-y-1/2 right-[5%]"
        />
      )}
    </form>
  );
}
