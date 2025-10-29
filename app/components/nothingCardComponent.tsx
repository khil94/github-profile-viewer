import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface props {
  TargetIcon: LucideIcon;
  text: string;
  content?: ReactNode;
}
export default function NothingCardComponent({
  text,
  TargetIcon,
  content,
}: props) {
  return (
    <Card className="p-12 text-center bg-primary-container rounded-2xl text-on-primary-container">
      <TargetIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
      <p className="text-on-muted-primary font-bold mb-4">{text}</p>
      {content}
    </Card>
  );
}
