import { BadgeItem } from "@/app/types";
import { Card } from "@/components/ui/card";

interface props {
  badge: BadgeItem;
  name: string;
}

export default function BadgeCard({ badge, name }: props) {
  return (
    <Card className="bg-primary-container rounded-2xl p-4 break-keep">
      <div className="flex flex-row gap-2 items-center">
        <badge.Icon className={badge.color + " h-auto w-[10%]"} />
        <h2 className="font-bold text-xl">{name}</h2>
      </div>
      <h3 className="text-on-muted-primary">{badge.content}</h3>
    </Card>
  );
}
