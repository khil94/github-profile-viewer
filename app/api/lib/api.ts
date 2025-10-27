import { GithubUserResponse } from "@/app/types";

export async function apiGet<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API ERROR : ${res.status}`);
  return res.json();
}

export const API = {
  async searchUser(username: string) {
    return apiGet<GithubUserResponse>(
      `/api/github/users/search?username=${encodeURIComponent(username)}`
    );
  },
};
