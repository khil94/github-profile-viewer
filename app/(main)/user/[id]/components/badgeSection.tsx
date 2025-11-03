import Mapper from "@/app/components/mapper";
import NothingCardComponent from "@/app/components/nothingCardComponent";
import { BadgeRecord } from "@/app/constants/badgeList";
import { Badge, GithubContributionResponse } from "@/app/types";
import { badgeGeneratorRecord } from "@/lib/badgeUtils";
import { Search } from "lucide-react";
import BadgeCard from "./badgeCard";

interface props {
  data: GithubContributionResponse;
}

export default function BadgeSection({ data }: props) {
  const acquiredBadges = Object.entries(badgeGeneratorRecord)
    .filter(([Key, val]) => {
      return val(data);
    })
    .map((v) => {
      return {
        name: v[0],
        item: BadgeRecord[v[0] as Badge],
      };
    });

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">배지</h2>
      <Mapper
        targetList={acquiredBadges}
        mapFunc={(t) => {
          return (
            <BadgeCard
              badge={t.item}
              name={t.name as Badge}
              key={t.item.content}
            />
          );
        }}
        fallback={
          <NothingCardComponent
            TargetIcon={Search}
            text="획득한 배지가 없습니다."
          />
        }
        wrapper={(v) => (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {v}
          </div>
        )}
      />
    </section>
  );
}
