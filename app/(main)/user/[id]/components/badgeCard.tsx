import { BadgeItem } from "@/app/types";
import { Card } from "@/components/ui/card";

interface props {
  badge: BadgeItem;
  name: string;
}

export default function BadgeCard({ badge, name }: props) {
  return (
    <Card
      className={`bg-primary-container rounded-2xl p-4 break-keep ${badge.color}`}
    >
      <div className="">
        <h2 className="font-bold text-xl">{`${badge.icon} ${name}`}</h2>
      </div>
      <h3 className="text-on-muted-primary">{badge.content}</h3>
    </Card>
  );
}
