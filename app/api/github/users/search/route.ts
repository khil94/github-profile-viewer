import { octokit } from "@/app/api/lib/octokit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  if (!username) {
    return NextResponse.json(
      {
        error: "username query param is required",
      },
      {
        status: 400,
      }
    );
  }
  try {
    const q = `${username} type:user`;

    const res = await octokit.request("GET /search/users", {
      q,
      per_page: 10,
    });
    return NextResponse.json(res.data);
  } catch (err) {
    return NextResponse.json(
      {
        error: `failed to search users : ${err}`,
      },
      {
        status: 500,
      }
    );
  }
}
