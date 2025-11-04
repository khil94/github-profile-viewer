"use client";
import { API } from "@/app/api/lib/api";
import Mapper from "@/app/components/mapper";
import SearchInput from "@/app/components/searchInput";
import { GithubUserItem } from "@/app/types";
import { X } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import SimpleUserCard from "./simpleUserCard";

export default function SearchSection() {
  const [userList, setUserList] = useState<GithubUserItem[]>([]);
  const [val, setVal] = useState("");
  const [debouncedVal, setDebouncedVal] = useState("");
  const [isPending, startTransition] = useTransition();
  const [currentUser, setCurrentUser] = useState<GithubUserItem>();

  const handleSearchUser = (v: string) => {
    startTransition(async () => {
      console.log("inside transition...");
      const resp = await API.searchUser(v);
      console.log("resp is here : ", resp.items);
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
    <section>
      <div className="flex flex-col gap-6">
        <SearchInput
          className=""
          value={val}
          onChangeValue={(v) => setVal(v)}
        />
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
                <div
                  onClick={() => setCurrentUser(v)}
                  key={`${val}-${v.id}`}
                  className="hover:cursor-pointer rounded-2xl hover:bg-accent-primary hover:text-on-accent-primary"
                >
                  <SimpleUserCard key={`${val}-${v.id}`} target={v} />
                </div>
              );
            }}
            fallback={<>there is no list</>}
          />
        )}
      </div>
    </section>
  );
}
