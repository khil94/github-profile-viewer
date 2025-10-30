import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface props {
  title: string;
  content: string;
  subscription?: string;
  Icon: LucideIcon;
  iconClass?: string;
}

export default function InfoCard({
  title,
  content,
  subscription,
  Icon,
  iconClass,
}: props) {
  return (
    <Card className="w-full grid grid-cols-5 px-4 rounded-2xl bg-primary-container">
      <div className="flex flex-col gap-1 col-span-4">
        <h1 className="text-xs text-on-muted-primary">{title}</h1>
        <p className="text-2xl">{content}</p>
        <p className="text-xs text-on-muted-primary">{subscription}</p>
      </div>
      <Icon className={`${iconClass} col-span-1`} />
    </Card>
  );
}
