import { RepoNode } from "@/app/types";
import { Card } from "@/components/ui/card";
import { CodeXml, GitBranch, LucideIcon, Star } from "lucide-react";

interface props {
  repoData: RepoNode;
}

export function TextWithIcon({
  Icon,
  text,
}: {
  Icon: LucideIcon;
  text: string;
}) {
  return (
    <div>
      <Icon />
      <p>{text}</p>
    </div>
  );
}

export default function RepoCard({ repoData }: props) {
  return (
    <Card className="rounded-2xl bg-primary-container p-2">
      <h1 className="text-link font-bold text-xl">{repoData.name}</h1>
      <p className="text-on-muted-primary text-sm">{repoData.description}</p>
      <div className="flex flex-row items-center  gap-1 text-xs text-on-muted-primary">
        <CodeXml className="w-[5%] h-auto" />
        {repoData.languages.edges.map((v) => {
          return <p key={`${repoData.name}-${v.node.name}`}>{v.node.name}</p>;
        })}
      </div>
      <div>
        <TextWithIcon
          Icon={Star}
          text={repoData.stargazerCount.toLocaleString()}
        />
        <TextWithIcon
          Icon={GitBranch}
          text={repoData.forkCount.toLocaleString()}
        />
      </div>
    </Card>
  );
}
