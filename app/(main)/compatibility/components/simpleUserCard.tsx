import { GithubUserItem } from "@/app/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface props {
  target: GithubUserItem;
}

export default function SimpleUserCard({ target }: props) {
  return (
    <div className="flex gap-4 items-center p-2 rounded-2xl ">
      <Avatar className="w-8 h-8">
        <AvatarImage
          src={target.avatar_url || "/placeholder.svg"}
          alt={target.login}
        />
        <AvatarFallback className="bg-primary text-on-primary text-3xl">
          {target.login.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <span>{target.login}</span>
    </div>
  );
}
