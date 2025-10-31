"use client";

import SearchInput from "@/app/components/searchInput";
import { Repo } from "@/app/types";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import RepoCard from "./repoCard";

interface props {
  repoList: Repo;
}

const PAGE_SIZE = 10;

export default function RepoTab({ repoList }: props) {
  const [val, setVal] = useState("");
  const [idx, setIdx] = useState(0);

  const filteredList = useMemo(
    () => repoList.nodes.filter((v) => v.name.includes(val)),
    [val, repoList.nodes]
  );

  const totalPage = useMemo(
    () => Math.ceil(filteredList.length / PAGE_SIZE),
    [filteredList]
  );

  const targetList = useMemo(
    () => filteredList.slice(idx * PAGE_SIZE, (idx + 1) * PAGE_SIZE),
    [idx, filteredList]
  );

  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">저장소</h1>
      <div>
        <SearchInput
          value={val}
          onChangeValue={(v) => setVal(v)}
          className="w-1/3 bg-primary-container"
          placeholder="저장소 이름"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {targetList.map((v) => {
          return <RepoCard key={v.url} repoData={v} />;
        })}
      </div>
      <div className="flex justify-center items-center gap-4">
        <Button
          onClick={() => setIdx((p) => p - 1)}
          disabled={idx === 0}
          className="rounded disabled:bg-muted-primary disabled:text-on-muted-primary"
          variant="outline"
        >
          이전
        </Button>
        <span>{totalPage > 0 ? `${idx + 1} / ${totalPage}` : "0 / 0"}</span>
        <Button
          onClick={() => setIdx((p) => p + 1)}
          disabled={idx >= totalPage - 1 || totalPage === 0}
          variant="outline"
          className="rounded disabled:bg-muted-primary disabled:text-on-muted-primary"
        >
          다음
        </Button>
      </div>
    </section>
  );
}
