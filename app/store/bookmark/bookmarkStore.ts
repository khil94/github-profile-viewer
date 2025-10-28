import { GithubUserItem } from "@/app/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const BOOKMARK_STORE_ITEM = "github-profile-viewer-bookmark";

export type Bookmark = Map<number, GithubUserItem>;
export type BookmarkState = {
  bookmark: Bookmark;
  isInBookmark: (v: number) => boolean;
  addBookmark: (v: GithubUserItem) => void;
  deleteBookmark: (v: number) => void;
};

export const useBookmarkStore = create(
  persist<BookmarkState>(
    (set, get) => ({
      bookmark: new Map<number, GithubUserItem>(),
      isInBookmark: (target: number) => {
        console.log("test", get());
        return get().bookmark?.has(target);
      },
      addBookmark: (target: GithubUserItem) => {
        const { isInBookmark, bookmark } = get();
        if (!isInBookmark(target.id)) {
          const temp = bookmark;
          temp.set(target.id, target);
          set({ bookmark: temp });
        }
      },
      deleteBookmark: (target: number) => {
        const temp = get().bookmark;
        temp.delete(target);
        set({ bookmark: temp });
      },
    }),
    {
      name: BOOKMARK_STORE_ITEM,
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const data = JSON.parse(str);
          data.state.bookmark = new Map(data.state.bookmark);
          return data;
        },
        setItem: (name, value) => {
          // value는 객체임. Map을 배열로 변환 후 저장
          const data = {
            ...value,
            state: {
              ...value.state,
              bookmark: Array.from(value.state.bookmark.entries()),
            },
          };
          localStorage.setItem(name, JSON.stringify(data));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
