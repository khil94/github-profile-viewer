import NothingCardComponent from "@/app/components/nothingCardComponent";
import UserCardComponent from "@/app/components/userCardComponent";
import { MOCKUP_USER } from "@/app/constants/mockupData";
import { UserX2 } from "lucide-react";
import Link from "next/link";
import SearchSection from "./components/searchSection";

export default async function UsersPage({
  params,
}: {
  params: { username: string };
}) {
  // const { username } = await params;
  // const resp = await API.searchUser(username);
  // const userItemList = resp.items;
  const userItemList = MOCKUP_USER.items;

  return (
    <div className="flex flex-col gap-6">
      <SearchSection />
      <h1 className="text-2xl font-bold">사용자 검색 결과</h1>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        {userItemList.length > 0 ? (
          userItemList.map((v, i) => {
            return (
              <Link key={v.id} href={`/user/${v.id}`}>
                <UserCardComponent profile={v} />
              </Link>
            );
          })
        ) : (
          <>
            <NothingCardComponent
              TargetIcon={UserX2}
              text="사용자를 찾을 수 없습니다. 다른 검색어를 시도해주세요."
            />
          </>
        )}
      </div>
    </div>
  );
}
