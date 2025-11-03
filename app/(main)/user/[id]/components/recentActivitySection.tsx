import Mapper from "@/app/components/mapper";
import NothingCardComponent from "@/app/components/nothingCardComponent";
import { GithubEventsIcon } from "@/app/constants/events";
import { GithubEventResponse } from "@/app/types";
import { eventItemGenerator } from "@/lib/eventUtils";
import { getTimeAgo } from "@/lib/utils";
import { Search } from "lucide-react";

interface props {
  data: GithubEventResponse[];
}

export default function RecentActivitySection({ data }: props) {
  return (
    <section className="">
      <h3 className="text-2xl font-bold mb-6">최근 활동</h3>
      <div className="p-6 bg-primary-container rounded-2xl">
        <ul className="space-y-2">
          <Mapper
            targetList={data}
            fallback={
              <NothingCardComponent
                className="border-none shadow-none"
                text="최근 활동이 없습니다."
                TargetIcon={Search}
              />
            }
            mapFunc={(v, i) => {
              const Icon = GithubEventsIcon[v.type];

              return (
                <li
                  className={`flex gap-4 pb-4 border-b last:pb-0 last:border-b-0`}
                  key={v.createdAt}
                >
                  <Icon className="text-accent-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="">
                      <span className="font-bold">{`${v.repo}`}</span>
                      {" - "}
                      <span className="text-on-muted-primary">{`${eventItemGenerator(
                        v
                      )}`}</span>
                    </p>
                    <p className="text-on-muted-primary text-xs">
                      {getTimeAgo(v.createdAt)}
                    </p>
                  </div>
                </li>
              );
            }}
          />
        </ul>
      </div>
    </section>
  );
}
