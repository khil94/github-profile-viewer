import { BadgeGenerator, GithubContributionResponse } from "@/app/types";

export const badgeGeneratorRecord: BadgeGenerator = {
  "꾸준한 개발자": (v: GithubContributionResponse) => {
    let activeDay = 0;
    v.recentContributions.contributionCalendar
      .weeks!.slice(0, 30)
      .forEach((t) =>
        t.contributionDays.forEach((k) => {
          if (k.contributionCount > 0) activeDay++;
        })
      );
    return activeDay >= 20;
  },
  "불타는 개발자": (v: GithubContributionResponse) => {
    const answer = v.recentContributions.contributionCalendar.weeks!.some((v) =>
      v.contributionDays.some((t) => t.contributionCount >= 10)
    );
    return answer;
  },
  "리턴한 개발자": (v: GithubContributionResponse) => {
    const rest7day = v.recentContributions.contributionCalendar.weeks![0];
    const rest = v.recentContributions.contributionCalendar.weeks!.slice(1);
    const isRestZero = rest.every((t) =>
      t.contributionDays.every((k) => k.contributionCount === 0)
    );
    const isRest7NotZero = rest7day.contributionDays.some(
      (k) => k.contributionCount > 0
    );
    return isRestZero && isRest7NotZero;
  },
  "주말형 개발자": (v: GithubContributionResponse) => {
    return v.weekdayRatio[0] + v.weekdayRatio[6] >= 0.4;
  },
  "평일형 개발자": (v: GithubContributionResponse) => {
    return v.weekdayRatio[0] + v.weekdayRatio[6] < 0.2;
  },
  "다작 개발자": (v: GithubContributionResponse) => {
    return v.repositories.nodes.length >= 20;
  },
  "집중형 개발자": (v: GithubContributionResponse) => {
    return v.repositories.nodes.length <= 5;
  },
  "인기 프로젝트 오너": (v: GithubContributionResponse) => {
    return v.repositories.nodes.some((v) => v.stargazerCount >= 59);
  },
  "협업형 개발자": (v: GithubContributionResponse) => {
    return v.repositories.nodes.some((v) => v.forkCount >= 59);
  },
  "지속적 업데이트": (v: GithubContributionResponse) => {
    return v.repositories.nodes.some((v) => {
      const updatedAt = new Date(v.updatedAt);
      const today = new Date();
      return today.getTime() - updatedAt.getDate() < 1000 * 60 * 60 * 24 * 7;
    });
  },
  Spectialist: (v: GithubContributionResponse) => {
    const temp = v.languageDistribution;
    return Object.values(temp).some((v) => v >= 0.5);
  },
  "Frontend Lover": (v: GithubContributionResponse) => {
    const frontend = ["JavaScript", "TypeScript", "HTML", "CSS"];

    const temp = v.languageDistribution;
    return frontend.reduce((prev, curr) => prev + temp[curr], 0) >= 1.6;
  },
  "Backend Builder": (v: GithubContributionResponse) => {
    const backend = ["Java", "Go", "Python"];

    const temp = v.languageDistribution;
    return backend.reduce((prev, curr) => prev + temp[curr], 0) >= 1.2;
  },
  "Data Player": (v: GithubContributionResponse) => {
    const data = ["Python", "R"];

    const temp = v.languageDistribution;
    return data.reduce((prev, curr) => prev + temp[curr], 0) >= 0.8;
  },
  "Polyglot Developer": (v: GithubContributionResponse) => {
    const temp = v.languageDistribution;
    let cnt = 0;
    Object.values(temp).forEach((v) => v >= 0.4 && cnt++);
    return cnt >= 5;
  },
  "새해 첫 커밋러": (v: GithubContributionResponse) => {
    return v.firstCommit;
  },
  "Star Collector": (v: GithubContributionResponse) => {
    return (
      v.repositories.nodes.reduce(
        (prev, curr) => prev + curr.stargazerCount,
        0
      ) >= 100
    );
  },
  "Fork Driver": (v: GithubContributionResponse) => {
    return (
      v.repositories.nodes.reduce((prev, curr) => prev + curr.forkCount, 0) >=
      100
    );
  },
};
