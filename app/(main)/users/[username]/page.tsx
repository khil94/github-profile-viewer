import UserCardComponent from "@/app/components/userCardComponent";
import { MOCKUP_USER } from "@/app/constants/mockupData";

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
    <div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {userItemList.map((v, i) => {
          return <UserCardComponent key={v.id} profile={v} />;
        })}
      </div>
    </div>
  );
}
