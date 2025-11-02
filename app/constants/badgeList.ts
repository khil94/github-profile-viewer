import {
  ActivityBadge,
  Badge,
  BadgeItem,
  LanguageBadge,
  ProjectBadge,
  SignatureBadge,
} from "../types";

export const ACTIVITY_BADGE = [
  "꾸준한 개발자",
  "불타는 개발자",
  "리턴한 개발자",
  "주말형 개발자",
  "평일형 개발자",
] as const;

export const PROJECT_BADGE = [
  "다작 개발자",
  "집중형 개발자",
  "인기 프로젝트 오너",
  "협업형 개발자",
  "지속적 업데이트",
] as const;

export const LANGUAGE_BADGE = [
  "Spectialist",
  "Frontend Lover",
  "Backend Builder",
  "Data Player",
  "Polyglot Developer",
] as const;

export const SIGNATURE_BADGE = [
  "새해 첫 커밋러",
  "Star Collector",
  "Fork Driver",
] as const;

export const ActivityBadgeRecord: Record<ActivityBadge, BadgeItem> = {
  "꾸준한 개발자": {
    content: "일정한 리듬 유지",
    color: "text-yellow-300 border-yellow-300",
    icon: "🧭",
  },
  "불타는 개발자": {
    content: "불꽃처럼 커밋하시는군요!",
    color: "border-red-600 text-red-600",
    icon: "🔥",
  },
  "리턴한 개발자": {
    content: "오랜만에 돌아온 개발자",
    color: "text-orange-600 border-orange-600",
    icon: "🔁",
  },
  "주말형 개발자": {
    content: "주말에 주로 개발해요",
    color: "text-blue-600 border-blue-600",
    icon: "☀️",
  },
  "평일형 개발자": {
    content: "평일에 주로 개발해요",
    color: "",
    icon: "🏢",
  },
};

export const ProjectBadgeRecord: Record<ProjectBadge, BadgeItem> = {
  "다작 개발자": {
    content: "프로젝트를 많이 개발하시는 군요!",
    color: "text-cyan-600 border-cyan-600",
    icon: "🧩",
  },
  "인기 프로젝트 오너": {
    content: "인기 있는 프로젝트 보유자",
    color: "text-amber-600 border-amber-600",
    icon: "🌟",
  },
  "지속적 업데이트": {
    content: "최근에도 계속 개발중",
    color: "text-emerald-600 border-emerald-600",
    icon: "♻️",
  },
  "집중형 개발자": {
    content: "몇 개의 프로젝트에만 집중중",
    color: "text-violet-600 border-violet-600",
    icon: "🎯",
  },
  "협업형 개발자": {
    content: "포크를 자주 했어요",
    color: "text-teal-600 border-teal-600",
    icon: "🤝",
  },
};

export const LanguageBadgeRecord: Record<LanguageBadge, BadgeItem> = {
  "Backend Builder": {
    content: "Backend Developer",
    color: "text-green-600 border-green-600",
    icon: "🏗️",
  },
  "Data Player": {
    content: "Data Developer",
    color: "text-zinc-600 border-zinc-600",
    icon: "📊",
  },
  "Frontend Lover": {
    content: "Frontend Developer",
    color: "text-sky-600 border-sky-600",
    icon: "🎨",
  },
  "Polyglot Developer": {
    content: "다양한 언어를 구사하시네요!",
    color: "text-indigo-600 border-indigo-600",
    icon: "🌍",
  },
  Spectialist: {
    content: "전문 분야가 있는 개발자",
    color: "text-yellow-600 border-yellow-600",
    icon: "🧠",
  },
};

export const SignatureBadgeRecord: Record<SignatureBadge, BadgeItem> = {
  "Fork Driver": {
    content: "포크된 저장소가 많아요",
    color: "text-slate-600 border-slate-600",
    icon: "🍴",
  },
  "Star Collector": {
    content: "별 수집가",
    color: "text-yellow-600 border-yellow-600",
    icon: "⭐",
  },
  "새해 첫 커밋러": {
    content: "올해 시작을 개발로 보낸 개발자",
    color: "text-sky-300 border-sky-300",
    icon: "🎆",
  },
};

export const BadgeRecord: Record<Badge, BadgeItem> = {
  ...ActivityBadgeRecord,
  ...ProjectBadgeRecord,
  ...LanguageBadgeRecord,
  ...SignatureBadgeRecord,
};
