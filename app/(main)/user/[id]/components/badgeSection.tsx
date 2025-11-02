import { BadgeRecord } from "@/app/constants/badgeList";
import { Badge, GithubContributionResponse } from "@/app/types";
import { badgeGeneratorRecord } from "@/lib/badgeUtils";
import BadgeCard from "./badgeCard";

interface props {
  resp: GithubContributionResponse;
}

export default function BadgeSection({ resp }: props) {
  const acquiredBadges = Object.entries(badgeGeneratorRecord)
    .filter(([Key, val]) => {
      return val(resp);
    })
    .map((v) => {
      return {
        name: v[0],
        item: BadgeRecord[v[0] as Badge],
      };
    });

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">배지</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {acquiredBadges.map((t) => {
          return (
            <BadgeCard badge={t.item} name={t.name} key={t.item.content} />
          );
        })}
      </div>
    </section>
  );
}
