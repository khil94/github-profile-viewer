import { API } from "@/app/api/lib/api";
import UserCardComponent from "@/app/components/userCardComponent";
import TabLayout, { tabItem } from "@/app/layouts/tabLayout";
import { getAverageContribution } from "@/lib/utils";
import {
  Calendar,
  ChartColumn,
  CodeXml,
  GitBranch,
  Globe,
  TrendingUp,
  Zap,
} from "lucide-react";
import ContributionTab from "./components/contributionTab";
import InfoCard from "./components/infoCard";
import LagnTab from "./components/langTab";
import OverviewSection from "./components/overviewSection";
import RecentlyViewedUserHandler from "./components/recentlyViewedUserHandler";
import RepoTab from "./components/repoTab";

export default async function UserDetailPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;
  const userData = await API.getUserDataById(id);
  const [contributionData, eventData] = await Promise.all([
    API.getUserContributionsByLogin(userData.login),
    API.getUserRecentEvetsByUsername(userData.login),
  ]);

  const userDetailTabList: tabItem[] = [
    {
      name: "개요",
      content: (
        <OverviewSection
          eventData={eventData.recentActivity}
          contributionData={contributionData}
        />
      ),
      icon: TrendingUp,
    },
    {
      name: "저장소",
      content: <RepoTab repoList={contributionData.repositories} />,
      icon: GitBranch,
    },
    {
      name: "언어",
      content: (
        <LagnTab languageDistribution={contributionData.languageDistribution} />
      ),
      icon: CodeXml,
    },
    {
      name: "기여도",
      content: (
        <ContributionTab
          login={userData.login}
          weekdayRatio={contributionData.weekdayRatio}
        />
      ),
      icon: ChartColumn,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <RecentlyViewedUserHandler target={userData} />
      <section>
        <UserCardComponent type="full" profile={userData} />
      </section>

      <section className="lg:flex flex-row gap-2 grid grid-cols-2">
        <InfoCard
          title="최근 1년간 기여"
          content={contributionData.totalContributions.toLocaleString()}
          // subscription="+12% 이번 달"
          Icon={TrendingUp}
          iconClass="text-blue-500"
        />
        <InfoCard
          title="최근 3개월 평균 기여"
          content={getAverageContribution(
            contributionData.recentContributions.contributionCalendar
          )}
          subscription="일일 평균"
          Icon={Zap}
          iconClass="text-yellow-500"
        />
        {contributionData.favoriteLanguage && (
          <InfoCard
            title="가장 좋아하는 언어"
            content={contributionData.favoriteLanguage}
            subscription={`${Math.round(
              contributionData.languageDistribution[
                contributionData.favoriteLanguage
              ] * 100
            )}%의 레포지토리에서 사용됨`}
            Icon={Globe}
            iconClass="text-green-500"
          />
        )}
        {contributionData.mostActiveDay && (
          <InfoCard
            title="가장 활동적인 요일"
            content={contributionData.mostActiveDay}
            subscription={`${Math.floor(
              contributionData.weekdayRatio[contributionData.mostActiveDay] *
                100
            )}%를 차지`}
            Icon={Calendar}
            iconClass="text-purple-500"
          />
        )}
      </section>
      <TabLayout tabList={userDetailTabList} />
    </div>
  );
}
