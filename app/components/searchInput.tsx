"use client";

import { MoveRight } from "lucide-react";
import { useState } from "react";

interface props {
  className?: string;
  onSubmit: (val: string) => void;
}

export default function SearchInput({ className, onSubmit }: props) {
  const [val, setVal] = useState("");

  return (
    <div className={`relative text-black ${className}`}>
      <input
        className={`w-full pr-[20%] md:pr-[18%] bg-white border-2 border-border rounded-4xl focus:outline-2 outline-accent-border p-[5%]`}
        value={val}
        onChange={(e) => {
          setVal(e.target.value.trim());
        }}
      />
      {val.length !== 0 && (
        <MoveRight
          onClick={() => onSubmit(val)}
          className="hover:cursor-pointer w-[8%] md:w-[5%] h-full absolute opacity-60 top-1/2 -translate-y-1/2 right-[5%]"
        />
      )}
    </div>
  );
}
