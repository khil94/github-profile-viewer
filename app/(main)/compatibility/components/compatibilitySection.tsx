"use client";

import Mapper from "@/app/components/mapper";
import UserAvatar from "@/app/components/userAvatar";
import {
  ContributionCalendar,
  data,
  GithubContributionResponse,
  GithubUserItem,
} from "@/app/types";
import {
  getAverageContributionScore,
  getLanguageScore,
  getStreakScore,
  getWeeklyRatioScore,
} from "@/lib/compatibilityUtils";
import {
  dynamicColors,
  getAverageContribution,
  getAverageStreak,
} from "@/lib/utils";
import { Heart } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DiffComponent from "./diffComponent";

interface userData {
  contributionData: GithubContributionResponse;
  userData: GithubUserItem;
}

type props = {
  [P in keyof data<userData>]?: data<userData>[P];
};

function getScoreSubscr(score: number) {
  return score >= 80
    ? "완벽한 팀! 함께 멋진 프로젝트를 만들 수 있어요."
    : score >= 60
    ? "좋은 팀! 서로 다른 강점을 가지고 있네요."
    : score >= 40
    ? "괜찮은 조합! 새로운 관점을 배울 수 있어요."
    : "독립적인 개발자! 서로 다른 길을 가고 있네요.";
}

export default function CompatibilitySection({ first, second }: props) {
  if (first === undefined || second === undefined) return <></>;

  const contributionData: data<ContributionCalendar> = {
    first: first.contributionData.recentContributions.contributionCalendar,
    second: second.contributionData.recentContributions.contributionCalendar,
  };
  const weekdayRatioData: data<Record<string, number>> = {
    first: first.contributionData.weekdayRatio,
    second: second.contributionData.weekdayRatio,
  };

  const langRatioData: data<Record<string, number>> = {
    first: first.contributionData.languageDistribution,
    second: second.contributionData.languageDistribution,
  };

  const streakData: data<number> = {
    first: getAverageStreak(contributionData.first),
    second: getAverageStreak(contributionData.second),
  };

  const averageData: data<number> = {
    first: Number(getAverageContribution(contributionData.first)),
    second: Number(getAverageContribution(contributionData.second)),
  };

  const loginData: data<string> = {
    first: first.userData.login,
    second: second.userData.login,
  };
  const activityDayData = Object.entries(weekdayRatioData.first).map(
    ([key, val]) => {
      return {
        day: key,
        [loginData.first]: Math.floor(val * 100),
        [loginData.second]: Math.floor(weekdayRatioData.second[key] * 100),
      };
    }
  );

  const sharedLanguage = Object.keys(langRatioData.first).filter((lang) =>
    Object.keys(langRatioData.second).includes(lang)
  );

  const langFavoriteData = {
    first: Object.entries(langRatioData.first)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([key, val]) => ({
        name: key,
        value: Math.floor(val * 100),
        color: dynamicColors(),
      })),
    second: Object.entries(langRatioData.second)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([key, val]) => ({
        name: key,
        value: Math.floor(val * 100),
        color: dynamicColors(),
      })),
  };

  const score =
    getStreakScore(streakData) +
    getAverageContributionScore(averageData) +
    getWeeklyRatioScore(weekdayRatioData) +
    getLanguageScore(sharedLanguage, {
      first: langFavoriteData.first.map((v) => v.name),
      second: langFavoriteData.second.map((v) => v.name),
    });

  return (
    <section className="flex flex-col gap-8 w-full">
      <section className="bg-primary-container rounded-2xl p-8">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <UserAvatar
              avatar_url={first.userData.avatar_url}
              login={first.userData.login}
            />
            <Heart className="w-8 h-8 text-accent-primary" />
            <UserAvatar
              avatar_url={second.userData.avatar_url}
              login={second.userData.login}
            />
          </div>

          <div className="text-center">
            <div className="text-6xl font-bold text-on-primary-container mb-2">
              {score}%
            </div>
            <p className="text-lg font-semibold text-on-secondary mb-1">
              개발자 궁합도
            </p>
            <p className="text-on-muted-primary">{getScoreSubscr(score)}</p>
          </div>
        </div>
        {/* Compatibility Details */}
        <div className="text-center border-t border-border pt-4 mt-4">
          <div className="text-2xl font-bold text-on-secondary-container">
            공통 언어
          </div>
          <p className="text-sm text-on-muted-secondary">
            {sharedLanguage.length}개
          </p>
        </div>
      </section>

      {/* 수치 비교 섹션 */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <DiffComponent
          label="평균 연속 기여"
          value={streakData}
          login={loginData}
        />
        <DiffComponent
          label="평균 기여"
          value={averageData}
          login={loginData}
        />
      </section>

      {/* 활동 요일 비율 비교 섹션 */}
      <section className=" bg-primary-container rounded-2xl p-4">
        <h3 className="text-center font-semibold text-on-primary-container mb-6">
          요일별 활동 비율
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            margin={{
              top: 20,
              right: 0,
              left: 0,
              bottom: 5,
            }}
            data={activityDayData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" stroke="#8b949e" />
            <YAxis
              yAxisId="left"
              orientation="left"
              stroke="#58a6ff"
              width="auto"
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#ad46ff"
              width="auto"
            />
            <Tooltip
              labelStyle={{
                color: "var(--on-inverse)",
              }}
              contentStyle={{
                backgroundColor: "var(--inverse-container)",
              }}
            />
            <Legend />
            <Bar dataKey={loginData.first} fill="#58a6ff" />
            <Bar dataKey={loginData.second} fill="#ad46ff" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* 언어 비교 섹션 */}
      <section className="bg-primary-container rounded-2xl p-4">
        <h3 className="text-center font-semibold text-on-primary-container mb-6">
          주사용 언어 비교
        </h3>
        <div className="grid grid-cols-2 gap-4 p-2">
          <Mapper
            targetList={langFavoriteData.first}
            fallback={<div className="m-auto">데이터 없음</div>}
            wrapper={(v) => (
              <div className="flex flex-col gap-4 p-4 bg-secondary-container rounded-2xl">
                <span className=" text-on-muted-primary text-sm">
                  {loginData.first}
                </span>
                <div>{v}</div>
              </div>
            )}
            mapFunc={(lang, idx) => (
              <div key={`${lang}-${idx}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="text-on-primary-container font-medium">
                      {lang.name}
                    </span>
                  </div>
                  <span className="text-on-muted-primary">{lang.value}%</span>
                </div>
                <div className="w-full bg-muted-primary rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${lang.value}%`,
                      backgroundColor: lang.color,
                    }}
                  />
                </div>
              </div>
            )}
          />
          <Mapper
            targetList={langFavoriteData.second}
            fallback={<div className="m-auto">데이터 없음</div>}
            wrapper={(v) => (
              <div className="flex flex-col gap-4 p-4 bg-secondary-container rounded-2xl">
                <span className="text-right text-on-muted-primary text-sm">
                  {loginData.second}
                </span>
                <div>{v}</div>
              </div>
            )}
            mapFunc={(lang, idx) => (
              <div key={`${lang}-${idx}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="text-on-primary-container font-medium">
                      {lang.name}
                    </span>
                  </div>
                  <span className="text-on-muted-primary">{lang.value}%</span>
                </div>
                <div className="w-full bg-muted-primary rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${lang.value}%`,
                      backgroundColor: lang.color,
                    }}
                  />
                </div>
              </div>
            )}
          />
        </div>
      </section>
    </section>
  );
}
