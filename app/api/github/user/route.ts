import { GithubContribution, GithubContributionResponse } from "@/app/types";
import { getContributionData, getLanguageMap } from "@/lib/contributionUtils";
import { NextRequest, NextResponse } from "next/server";
import { graphqlWithOctokit, octokit } from "../../lib/octokit";

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

export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const login = searchParams.get("login");

  const to = new Date();
  const from = new Date();
  from.setMonth(to.getMonth() - 3);

  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        # 총 기여도
        total: contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
        # 최근 3개월
        recent: contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
        # repo 언어 분포
        repositories(first: 100, ownerAffiliations: OWNER) {
          nodes {
            name
            url
            languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
              edges {
                size
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  `;
  const { user } = await graphqlWithOctokit<{ user: GithubContribution }>(
    query,
    {
      login,
      from: from.toISOString(),
      to: to.toISOString(),
    }
  );

  const { mostActiveDay, weekdayRatio } = getContributionData(user);

  const { languageDistribution, mostLanguage } = getLanguageMap(
    user.repositories.nodes
  );

  const resp: GithubContributionResponse = {
    totalContributions: user.total.contributionCalendar.totalContributions,
    recentContributions: user.recent,
    languageDistribution,
    mostActiveDay,
    weekdayRatio,
    mostLanguage,
  };

  return NextResponse.json(resp);
}
