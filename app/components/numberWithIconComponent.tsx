import { LucideIcon } from "lucide-react";

export default function NumberWithIcon({
  number,
  Icon,
  text,
}: {
  number: number;
  Icon: LucideIcon;
  text: string;
}) {
  return (
    <div className="text-center flex flex-col justify-center items-center gap-2">
      <h2 className=" font-bold text-2xl text-accent-primary">
        {number.toLocaleString()}
      </h2>
      <div className="flex flex-row text-sm text-on-muted-primary gap-1">
        <Icon className="w-[20%]" />
        {text}
      </div>
    </div>
  );
}
