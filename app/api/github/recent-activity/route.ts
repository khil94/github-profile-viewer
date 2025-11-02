// /app/api/github/recent-activity/route.ts
import { GITHUB_EVENTS } from "@/app/constants/events";
import { NextRequest, NextResponse } from "next/server";
import { octokit } from "../../lib/octokit";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const username = searchParams.get("username");
  if (!username)
    return NextResponse.json({ error: "username required" }, { status: 400 });

  try {
    const res = await octokit.request(`GET /users/${username}/events/public`, {
      headers: {
        per_page: 5,
      },
    });
    const events = res.data;

    // 주요 활동만 필터링
    const majorEvents = events
      .filter((e: any) => GITHUB_EVENTS.includes(e.type))
      .slice(0, 5); // 최대 5개

    // 필요한 정보만 추출
    const simplified = majorEvents.map((e: any) => ({
      type: e.type,
      repo: e.repo.name,
      createdAt: e.created_at,
      actor: e.actor.login,
      payload: e.payload, // PR/commit 등 세부 정보 필요시
    }));

    return NextResponse.json({ recentActivity: simplified });
  } catch (err) {
    return NextResponse.json(
      {
        error: `failed to get events of users : ${err}`,
      },
      {
        status: 500,
      }
    );
  }
}
