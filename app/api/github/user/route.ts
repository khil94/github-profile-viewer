import { NextRequest, NextResponse } from "next/server";
import { octokit } from "../../lib/octokit";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      {
        error: "id param is required",
      },
      {
        status: 400,
      }
    );
  }
  try {
    const res = await octokit.request(`GET /user/${id}`, {
      account_id: id,
    });
    return NextResponse.json(res.data);
  } catch (err) {
    return NextResponse.json(
      {
        error: `failed to get data : ${err}`,
      },
      {
        status: 500,
      }
    );
  }
}
