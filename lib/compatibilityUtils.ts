import { data } from "@/app/types";

export function getStreakScore(data: data<number>) {
  const val = Math.abs(data.first - data.second);

  if (val > 2.5) return 0;
  if (val > 2) return 5;
  if (val > 1.5) return 10;
  if (val > 1) return 15;
  if (val > 0.5) return 20;
  return 25;
}

export function getAverageContributionScore(data: data<number>) {
  const val = Math.abs(data.first - data.second);

  if (val > 5) return 0;
  if (val > 4) return 5;
  if (val > 3) return 10;
  if (val > 2) return 15;
  if (val > 1) return 20;
  return 25;
}

export function getDevWorkingDayType(data: Record<string, number>) {
  if (data[0] + data[6] >= 0.4) {
    return "e"; //주말
  }
  if (data[0] + data[6] < 0.2) {
    return "w"; //평일
  }
  return "n"; //none
}

export function getWeeklyRatioScore(data: data<Record<string, number>>) {
  let totalScore = 0;
  const [first, second] = [
    getDevWorkingDayType(data.first),
    getDevWorkingDayType(data.second),
  ];
  if (first === second) totalScore += 12;

  Object.entries(data.first).forEach(([Key, val]) => {
    const diff = Math.abs(val - data.second[Key]);
    if (diff <= 0.05) totalScore += 2;
  });

  return totalScore;
}

export function getLanguageScore(sharedLang: string[], data: data<string[]>) {
  let totalScore = 0;
  const { first, second } = data;
  sharedLang.forEach((v) => {
    if (first.includes(v) && second.includes(v)) {
      totalScore += 8;
    }
  });
  return totalScore;
}
