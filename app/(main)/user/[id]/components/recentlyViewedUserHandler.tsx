"use client";

import { useRecentlyViewedStore } from "@/app/store/recently_viewed/store";
import { GithubUserItem } from "@/app/types";
import { useEffect } from "react";

interface props {
  target: GithubUserItem;
}

export default function RecentlyViewedUserHandler({ target }: props) {
  const { addUser } = useRecentlyViewedStore();
  useEffect(() => {
    addUser(target);
  }, [target]);
  return <></>;
}
