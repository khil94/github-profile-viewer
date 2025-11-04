import {
  GithubContributionResponse,
  GithubEventResponse,
  GithubUserItem,
  GithubUserResponse,
} from "@/app/types";
import { notFound } from "next/navigation";

export async function apiGet<T>(url: string, cachingTime?: number): Promise<T> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(API_BASE_URL + url, {
    next: { revalidate: cachingTime || 3600 },
  });

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error(`API ERROR : ${res.status}`);
  }
  return res.json();
}

export async function apiPost<T>(
  url: string,
  cachingTime?: number
): Promise<T> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(API_BASE_URL + url, {
    method: "POST",
    next: { revalidate: cachingTime || 3600 },
  });

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error(`API ERROR : ${res.status}`);
  }
  return res.json();
}

export const API = {
  async searchUser(username: string) {
    return apiGet<GithubUserResponse>(
      `/api/github/users/search?username=${username}`
    );
  },
  async getUserDataById(id: number) {
    return apiGet<GithubUserItem>(`/api/github/user?id=${id}`);
  },
  async getUserContributionsByLogin(login: string) {
    return apiPost<GithubContributionResponse>(
      `/api/github/user?login=${login}`
    );
  },
  async getUserRecentEvetsByUsername(username: string) {
    return apiGet<{ recentActivity: GithubEventResponse[] }>(
      `/api/github/recent-activity?username=${username}`,
      1800
    );
  },
};
