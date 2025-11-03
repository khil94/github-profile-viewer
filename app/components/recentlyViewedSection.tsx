"use client";

import { SearchX } from "lucide-react";
import Link from "next/link";
import { useRecentlyViewedStore } from "../store/recently_viewed/store";
import Mapper from "./mapper";
import NothingCardComponent from "./nothingCardComponent";
import UserCardComponent from "./userCardComponent";

export default function RecentlyViewedSection() {
  const { userIdList, userRecord, deleteUser } = useRecentlyViewedStore();

  return (
    <section className="min-h-[calc(100vh/2)] w-full items-center flex flex-col gap-6">
      <h3 className="text-2xl font-bold ">최근 본 사용자</h3>
      <Mapper
        wrapper={(v) => <div>{v}</div>}
        targetList={userIdList}
        mapFunc={(v) => {
          return (
            <Link key={v} href={`/user/${v}`}>
              <UserCardComponent
                handleRemove={(v) => deleteUser(v)}
                profile={userRecord[v]}
              />
            </Link>
          );
        }}
        fallback={
          <NothingCardComponent
            className=""
            TargetIcon={SearchX}
            text="최근 본 사용자가 없습니다."
          />
        }
      />
    </section>
  );
}
