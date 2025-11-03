import { API } from "@/app/api/lib/api";
import UserSearchWrapper from "./components/userSearchWrapper";

export default async function UsersPage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;
  const resp = await API.searchUser(username);
  const userItemList = resp.items;

  return <UserSearchWrapper initialUsers={userItemList} username={username} />;
}
