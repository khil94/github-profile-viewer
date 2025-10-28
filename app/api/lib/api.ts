import { GithubUserResponse } from "@/app/types";

export async function apiGet<T>(url: string): Promise<T> {
  const API_BASE_URL = process.env.API_BASE_URL;
  const res = await fetch(API_BASE_URL + url);

  if (!res.ok) throw new Error(`API ERROR : ${res.status}`);
  return res.json();
}

export const API = {
  async searchUser(username: string) {
    return apiGet<GithubUserResponse>(
      `/api/github/users/search?username=${username}`
    );
  },
};
