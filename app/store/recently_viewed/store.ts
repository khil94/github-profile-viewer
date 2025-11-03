import { GithubUserItem } from "@/app/types";
import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

export const RECENTLY_VIEWED_USER = "github-profile-viewer-recently-viewed";

const MAX_LIST_LENGTH = 3;

export type recentlyViewedUserState = {
  userRecord: Record<number, GithubUserItem>;
  userIdList: number[];
};
const initialState: recentlyViewedUserState = {
  userRecord: {},
  userIdList: [],
};

export const useRecentlyViewedStore = create(
  persist(
    combine(initialState, (set, get) => ({
      addUser: (target: GithubUserItem) => {
        const { userIdList, userRecord } = get();
        if (!userRecord[target.id]) {
          if (userIdList.length === MAX_LIST_LENGTH) {
            const tempList = [...userIdList.slice(1), target.id];
            const tempRecord = { ...userRecord, [target.id]: target };
            set({
              userIdList: tempList,
              userRecord: tempRecord,
            });
          } else {
            const tempRecord = { ...userRecord, [target.id]: target };
            const tempList = [...userIdList, target.id];
            set({
              userIdList: tempList,
              userRecord: tempRecord,
            });
          }
        } else {
          // 존재하면 가장 최근에 본 것으로 위치 변경
          const filtered = userIdList.filter((v) => v !== target.id);
          set({ userIdList: [target.id, ...filtered] });
        }
      },
      deleteUser: (targetId: number) => {
        const { userIdList, userRecord } = get();
        const tempList = userIdList.filter((v) => v !== targetId);
        const tempRecord = { ...userRecord };
        delete tempRecord[targetId];
        set({
          userIdList: tempList,
          userRecord: tempRecord,
        });
      },
    })),
    {
      name: RECENTLY_VIEWED_USER,
    }
  )
);
