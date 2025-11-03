"use client";

import SearchInput from "@/app/components/searchInput";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function SearchSection() {
  const [val, setVal] = useState("");
  return (
    <section>
      <SearchInput
        className="w-4/5 md:w-1/2"
        placeholder="사용자 검색"
        onSubmit={(v) => {
          redirect(`/users/${v}`);
        }}
        value={val}
        onChangeValue={(v) => setVal(v)}
      />
    </section>
  );
}
