"use client";

import Mapper from "@/app/components/mapper";
import NothingCardComponent from "@/app/components/nothingCardComponent";
import UserCardComponent from "@/app/components/userCardComponent";
import { GithubUserItem } from "@/app/types";
import { UserX2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import SearchSection from "./searchSection";

function ListLoading() {
  return (
    <div className="flex justify-center items-center h-64">
      <svg
        className="animate-spin h-10 w-10 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
}

export default function UserSearchWrapper({
  initialUsers,
  username,
}: {
  initialUsers: GithubUserItem[];
  username: string;
}) {
  const [displayedUsers, setDisplayedUsers] = useState(initialUsers);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    setDisplayedUsers(initialUsers);
  }, [initialUsers]);

  const handleSearch = (searchValue: string) => {
    startTransition(() => {
      router.push(`/users/${searchValue}`);
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <SearchSection onSearch={handleSearch} disabled={isPending} />
      <h1 className="text-2xl font-bold">{`사용자 검색 결과 : ${username}`}</h1>
      {isPending ? (
        <ListLoading />
      ) : (
        <Mapper
          wrapper={(v) => (
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">{v}</div>
          )}
          targetList={displayedUsers}
          fallback={
            <NothingCardComponent
              TargetIcon={UserX2}
              text="사용자를 찾을 수 없습니다. 다른 검색어를 시도해주세요."
            />
          }
          mapFunc={(v, i) => {
            return (
              <Link key={v.id} href={`/user/${v.id}`}>
                <UserCardComponent profile={v} />
              </Link>
            );
          }}
        />
      )}
    </div>
  );
}
