"use client";

import SearchInput from "@/app/components/searchInput";
import { useState } from "react";

export default function SearchSection({
  onSearch,
  disabled,
}: {
  onSearch: (value: string) => void;
  disabled: boolean;
}) {
  const [val, setVal] = useState("");

  return (
    <section className="w-4/5 md:w-1/2">
      <SearchInput
        className="w-full"
        placeholder="사용자 검색"
        onSubmit={(v) => {
          onSearch(v);
        }}
        value={val}
        onChangeValue={(v) => setVal(v)}
        disabled={disabled}
      />
    </section>
  );
}