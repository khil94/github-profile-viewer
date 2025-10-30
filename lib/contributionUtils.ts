import { GithubContribution, RepoNode } from "@/app/types";

export function getLanguageMap(data: RepoNode[]) {
  // === 언어 통계 가공 ===
  const total = data.length;
  const tempMap: Record<string, number> = {};
  let mostLanguage = "";
  let mostLangRatio = 0;
  data.forEach((v) => {
    v.languages.edges.forEach((lang) => {
      tempMap[lang.node.name] = (tempMap[lang.node.name] || 0) + 1;
    });
  });

  // === 언어가 쓰인 repo 비율 가중치 ===
  const languageDistribution: Record<string, number> = {};
  Object.entries(tempMap).forEach(([lang, count]) => {
    languageDistribution[lang] = Math.round((count / total) * 100) / 100;
    if (languageDistribution[lang] > mostLangRatio) {
      mostLangRatio = languageDistribution[lang];
      mostLanguage = lang;
    }
  });

  return { languageDistribution, mostLanguage };
}

export function getContributionData(data: GithubContribution) {
  // === 요일별 통계 가공 ===
  const contributionDays = data.recent.contributionCalendar.weeks!.flatMap(
    (week) => week.contributionDays
  );

  const weekdaysCount: Record<string, number> = {
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
  };
  let mostActiveDay = "";
  let maxCount = 0;

  contributionDays.forEach((day) => {
    const date = new Date(day.date);
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
      date.getDay()
    ];
    weekdaysCount[weekday] += day.contributionCount;
    if (weekdaysCount[weekday] > maxCount) {
      maxCount = weekdaysCount[weekday];
      mostActiveDay = weekday;
    }
  });

  const totalContributionsRecent = contributionDays.reduce(
    (acc, day) => acc + day.contributionCount,
    0
  );
  const weekdayRatio: Record<string, number> = {};
  Object.keys(weekdaysCount).forEach((d) => {
    weekdayRatio[d] = weekdaysCount[d] / totalContributionsRecent;
  });

  return { mostActiveDay, weekdayRatio };
}
