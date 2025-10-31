import { ChartColumn, CodeXml, GitBranch, TrendingUp } from "lucide-react";
import { tabItem } from "../layouts/tabLayout";

export const userDetailTabList: tabItem[] = [
  {
    name: "개요",
    content: <div>개요</div>,
    icon: TrendingUp,
  },
  {
    name: "저장소",
    content: <div>저장소</div>,
    icon: GitBranch,
  },
  {
    name: "언어",
    content: <div>언어</div>,
    icon: CodeXml,
  },
  {
    name: "기여도",
    content: <div>기여도</div>,
    icon: ChartColumn,
  },
];
