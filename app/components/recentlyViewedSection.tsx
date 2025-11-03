"use client";

import { SearchX } from "lucide-react";
import { useRecentlyViewedStore } from "../store/recently_viewed/store";
import NothingCardComponent from "./nothingCardComponent";
import UserCardComponent from "./userCardComponent";

export default function RecentlyViewedSection() {
  const { userIdList, userRecord, deleteUser } = useRecentlyViewedStore();

  return (
    <section className="min-h-[calc(100vh/2)] w-full items-center flex flex-col gap-6">
      <h3 className="text-2xl font-bold ">최근 본 사용자</h3>

      {userIdList.length > 0 ? (
        <div className="flex flex-col md:flex-row">
          {userIdList.map((v) => {
            return (
              <UserCardComponent
                handleRemove={(v) => deleteUser(v)}
                key={v}
                profile={userRecord[v]}
              />
            );
          })}
        </div>
      ) : (
        <NothingCardComponent
          className=""
          TargetIcon={SearchX}
          text="최근 본 사용자가 없습니다."
        />
      )}
    </section>
  );
}
