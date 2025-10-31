"use client";
import { redirect } from "next/navigation";
import { useState } from "react";
import SearchInput from "./components/searchInput";

export default function Home() {
  const [val, setVal] = useState("");
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <SearchInput
        value={val}
        onChangeValue={(v) => setVal(v)}
        onSubmit={(v) => redirect(`/users/${v}`)}
        className="w-4/5 md:w-2/3 md:text-2xl lg:w-1/2 lg:text-3xl 2xl:text-4xl"
      />
      {/* <section>TEST</section> */}
      {/* <section></section> */}
    </div>
  );
}
