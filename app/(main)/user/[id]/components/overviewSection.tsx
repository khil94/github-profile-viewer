import { GithubContributionResponse, GithubEventResponse } from "@/app/types";
import BadgeSection from "./badgeSection";
import RecentActivitySection from "./recentActivitySection";

interface props {
  contributionData: GithubContributionResponse;
  eventData: GithubEventResponse[];
}

export default function OverviewSection({
  contributionData,
  eventData,
}: props) {
  return (
    <section className="flex flex-col gap-6">
      <BadgeSection data={contributionData} />
      <RecentActivitySection data={eventData} />
    </section>
  );
}
