import UserCardComponent from "@/app/components/userCardComponent";
import {
  MOCKUP_COMPUTED_CONTRIBUTION_DATA,
  MOCKUP_USER,
} from "@/app/constants/mockupData";
import TabLayout, { tabItem } from "@/app/layouts/tabLayout";
import {
  Calendar,
  ChartColumn,
  CodeXml,
  GitBranch,
  Globe,
  TrendingUp,
  Zap,
} from "lucide-react";
import InfoCard from "./components/infoCard";
import LagnTab from "./components/langTab";
import RepoTab from "./components/repoTab";

export default async function UserDetailPage({
  params,
}: {
  params: { id: number };
}) {
  // const { id } = await params;
  // const userData = await API.getUserDataById(id);
  // const contributionData = await API.getUserContributionsByLogin(
  //   userData.login
  // );
  // console.log("USER CONTRIBUTION LIST", contributionData);
  const userData = MOCKUP_USER.items[0];
  const contributionData = MOCKUP_COMPUTED_CONTRIBUTION_DATA;

  const userDetailTabList: tabItem[] = [
    {
      name: "개요",
      content: <div>개요</div>,
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
      content: <div>기여도</div>,
      icon: ChartColumn,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <section>
        <UserCardComponent type="full" profile={userData} />
      </section>
      <img
        src={`http://ghchart.rshah.org/${userData.login}`}
        alt={`${userData.login}'s Github chart`}
      />
      <section className="md:flex flex-row gap-2 grid grid-cols-2">
        <InfoCard
          title="총 기여도"
          content={contributionData.totalContributions.toLocaleString()}
          // subscription="+12% 이번 달"
          Icon={TrendingUp}
          iconClass="text-blue-500"
        />
        <InfoCard
          title="최근 3개월 평균 기여도"
          content={Math.round(
            (contributionData.recentContributions.contributionCalendar.weeks!
              .length *
              70) /
              90 /
              10
          ).toLocaleString()}
          subscription="일일 평균"
          Icon={Zap}
          iconClass="text-yellow-500"
        />
        <InfoCard
          title="가장 좋아하는 언어"
          content={contributionData.favoriteLanguage}
          subscription={`${
            contributionData.languageDistribution[
              contributionData.favoriteLanguage
            ] * 100
          }%의 레포지토리에서 사용됨`}
          Icon={Globe}
          iconClass="text-green-500"
        />
        <InfoCard
          title="가장 활동적인 요일"
          content={contributionData.mostActiveDay}
          subscription={`${Math.floor(
            contributionData.weekdayRatio[contributionData.mostActiveDay] * 100
          )}%를 차지`}
          Icon={Calendar}
          iconClass="text-purple-500"
        />
      </section>
      <TabLayout tabList={userDetailTabList} />
    </div>
  );
}
