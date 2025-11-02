import { GithubEventsIcon } from "@/app/constants/events";
import { GithubEventResponse } from "@/app/types";
import { eventItemGenerator } from "@/lib/eventUtils";
import { getTimeAgo } from "@/lib/utils";

interface props {
  data: GithubEventResponse[];
}

export default function RecentActivitySection({ data }: props) {
  return (
    <section className="">
      <h3 className="text-2xl font-bold mb-6">최근 활동</h3>
      <ul className="bg-primary-container rounded-2xl p-4">
        {data.map((v, i) => {
          const Icon = GithubEventsIcon[v.type];

          return (
            <li
              className={`flex flex-row p-4 gap-4 ${
                i !== data.length - 1 ? "border-b-1" : ""
              }`}
              key={v.createdAt}
            >
              <Icon className="text-accent-primary" />
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2">
                  <p className="font-bold">{`${v.repo} -`}</p>
                  <p className="text-on-muted-primary">{`${eventItemGenerator(
                    v
                  )}`}</p>
                </div>
                <p className="text-on-muted-primary text-xs">
                  {getTimeAgo(v.createdAt)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
