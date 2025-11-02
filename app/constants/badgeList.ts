import {
  Building,
  Calendar1,
  ChartAreaIcon,
  CodeXml,
  Database,
  Flame,
  GitBranchPlus,
  GitFork,
  Music,
  Recycle,
  SquareStack,
  Star,
  Stars,
  Target,
  Tent,
  Undo2,
  Zap,
} from "lucide-react";
import {
  ActivityBadge,
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

export const SignatureBadgeRecord: Record<SignatureBadge, BadgeItem> = {
  "Fork Driver": { content: "포크된 저장소가 많아요", Icon: GitBranchPlus },
  "Star Collector": { content: "별 수집가", Icon: Stars },
  "새해 첫 커밋러": {
    content: "올해 시작을 개발로 보낸 개발자",
    Icon: Calendar1,
  },
};

export const ActivityBadgeRecord: Record<ActivityBadge, BadgeItem> = {
  "꾸준한 개발자": { content: "일정한 리듬 유지", Icon: Music },
  "불타는 개발자": { content: "불꽃처럼 커밋하시는군요!", Icon: Flame },
  "리턴한 개발자": { content: "오랜만에 돌아온 개발자", Icon: Undo2 },
  "주말형 개발자": { content: "주말에 주로 개발해요", Icon: Tent },
  "평일형 개발자": { content: "평일에 주로 개발해요", Icon: Building },
};

export const ProjectBadgeRecord: Record<ProjectBadge, BadgeItem> = {
  "다작 개발자": {
    content: "프로젝트를 많이 개발하시는 군요!",
    Icon: SquareStack,
  },
  "인기 프로젝트 오너": { content: "인기 있는 프로젝트 보유자", Icon: Star },
  "지속적 업데이트": { content: "최근에도 계속 개발중", Icon: Recycle },
  "집중형 개발자": { content: "몇 개의 프로젝트에만 집중중", Icon: Target },
  "협업형 개발자": { content: "포크를 자주 했어요", Icon: GitFork },
};

export const LanguageBadgeRecord: Record<LanguageBadge, BadgeItem> = {
  "Backend Builder": { content: "Backend Developer", Icon: Database },
  "Data Player": { content: "Data Developer", Icon: ChartAreaIcon },
  "Frontend Lover": { content: "Frontend Developer", Icon: CodeXml },
  "Polyglot Developer": { content: "다양한 언어를 구사하시네요!", Icon: Tent },
  Spectialist: { content: "전문 분야가 있는 개발자", Icon: Zap },
};
