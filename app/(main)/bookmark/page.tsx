"use client";

import NothingCardComponent from "@/app/components/nothingCardComponent";
import UserCardComponent from "@/app/components/userCardComponent";
import { useBookmarkStore } from "@/app/store/bookmark/bookmarkStore";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Link from "next/link";

export default function BookmarkPage() {
  const { bookmark } = useBookmarkStore();

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <h2 className=" text-3xl font-bold ">북마크한 사용자</h2>
        <p className="text-on-muted-primary">{`${bookmark.size}명의 사용자를 북마크했습니다.`}</p>
      </div>
      <div>
        {bookmark.size === 0 ? (
          <NothingCardComponent
            text="북마크한 사용자가 없습니다."
            TargetIcon={User}
            content={
              <Link href={"/"}>
                <Button className="bg-theme rounded hover:bg-accent-theme">
                  사용자 검색하기
                </Button>
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from(bookmark).map((v) => {
              return (
                <div key={`${v[0]}`}>
                  <UserCardComponent profile={v[1]} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
