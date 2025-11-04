"use client";
import { API } from "@/app/api/lib/api";
import Mapper from "@/app/components/mapper";
import SearchInput from "@/app/components/searchInput";
import { useBookmarkStore } from "@/app/store/bookmark/bookmarkStore";
import { GithubUserItem } from "@/app/types";
import { Bookmark, X } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import SimpleUserCard from "./simpleUserCard";

export default function SearchComponent() {
  const [userList, setUserList] = useState<GithubUserItem[]>([]);
  const [val, setVal] = useState("");
  const [debouncedVal, setDebouncedVal] = useState("");
  const [isPending, startTransition] = useTransition();
  const [currentUser, setCurrentUser] = useState<GithubUserItem>();
  const [openDropdown, setOpenDropdown] = useState(false);

  const { bookmark } = useBookmarkStore();

  console.log("bookmark", bookmark, bookmark.size);

  const handleSearchUser = (v: string) => {
    startTransition(async () => {
      const resp = await API.searchUser(v);
      setUserList(resp.items);
    });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedVal(val);
    }, 500); // 0.5초 디바운스

    return () => clearTimeout(handler);
  }, [val]);

  // 디바운스된 값이 변경될 때 API 호출
  useEffect(() => {
    if (!debouncedVal) {
      setUserList([]);
      return;
    }

    handleSearchUser(debouncedVal);
  }, [debouncedVal]);

  useEffect(() => {
    setUserList([]);
  }, [currentUser]);

  return (
    <div>
      <div className="flex flex-col gap-6">
        <SearchInput
          className=""
          placeholder="Github 사용자명 입력..."
          value={val}
          onChangeValue={(v) => setVal(v)}
        />

        {/* 북마크된 개발자 드롭다운 */}
        {bookmark.size > 0 && (
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="w-full rounded-2xl flex items-center justify-between px-3 py-2 bg-muted border border-border text-sm text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Bookmark className="w-4 h-4" />
                북마크된 개발자 ({bookmark.size})
              </span>
            </button>
            {openDropdown && (
              <Mapper
                targetList={Array.from(bookmark.values())}
                fallback={<></>}
                wrapper={(v) => (
                  <div className="absolute bg-primary-container top-full mt-1 left-0 right-0 border border-border shadow-lg z-10 max-h-64 overflow-y-auto">
                    {v}
                  </div>
                )}
                mapFunc={(v) => (
                  <button
                    onClick={() => setCurrentUser(v)}
                    className="w-full hover:cursor-pointer rounded-2xl hover:bg-accent-primary hover:text-on-accent-primary"
                  >
                    <SimpleUserCard key={`${val}-${v.id}`} target={v} />
                  </button>
                )}
              />
            )}
          </div>
        )}

        {currentUser && (
          <div className="rounded-2xl relative border-accent-border border-2">
            <SimpleUserCard target={currentUser} />
            <X className="absolute hover:opacity-100 opacity-50 w-4 h-auto right-[5%] top-1/2 -translate-y-1/2" />
          </div>
        )}
        {isPending ? (
          <>loading...</>
        ) : (
          <Mapper
            wrapper={(v) => (
              <div className="rounded-2xl bg-primary-container p-4">
                <h3 className=" text-on-muted-primary text-sm mb-2">{`검색 결과 (${userList.length})`}</h3>
                {v}
              </div>
            )}
            targetList={userList}
            mapFunc={(v, i) => {
              return (
                <button
                  onClick={() => setCurrentUser(v)}
                  key={`${val}-${v.id}`}
                  className="w-full hover:cursor-pointer rounded-2xl hover:bg-accent-primary hover:text-on-accent-primary"
                >
                  <SimpleUserCard key={`${val}-${v.id}`} target={v} />
                </button>
              );
            }}
            fallback={<>there is no list</>}
          />
        )}
      </div>
    </div>
  );
}
