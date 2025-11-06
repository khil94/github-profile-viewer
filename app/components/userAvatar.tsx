import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface props {
  avatar_url: string;
  login: string;
}

export default function UserAvatar({ avatar_url, login }: props) {
  return (
    <>
      <Avatar className="">
        <AvatarImage src={avatar_url || "/placeholder.svg"} alt={login} />
        <AvatarFallback className="bg-primary text-on-primary text-3xl">
          {login.charAt(0)}
        </AvatarFallback>
      </Avatar>
    </>
  );
}
