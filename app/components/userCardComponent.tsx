import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bookmark, MapPin, X } from "lucide-react";
import { GithubUserItem } from "../types";

interface props {
  profile: GithubUserItem;
  handleRemove?: (val: number) => void;
  handleBookMark?: (val: number) => void;
}
export default function UserCardComponent({
  profile,
  handleRemove,
  handleBookMark,
}: props) {
  return (
    <Card className="md:col-span-1 group bg-primary-container border-border p-6">
      <div className="flex items-start justify-between">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage
            src={profile.avatar_url || "/placeholder.svg"}
            alt={profile.login}
          />
          <AvatarFallback className="bg-primary text-on-primary text-3xl">
            {profile.login.charAt(0)}
          </AvatarFallback>
        </Avatar>
        {
          <Button
            className="hover:text-accent-primary"
            size={"icon-lg"}
            variant={"ghost"}
          >
            <Bookmark />
          </Button>
        }
        {handleRemove && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleRemove(profile.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {profile.name && (
          <h3 className="text-xl font-bold text-on-primary-container">
            {profile.name}
          </h3>
        )}
        <p className="text-on-muted-primary text-sm">{profile.bio}</p>

        <div className="flex items-center gap-2 ">
          {profile.login && (
            <p className=" text-sm text-on-muted-primary">@{profile.login}</p>
          )}
          {profile.location && (
            <div className="flex items-center gap-1 text-sm text-on-muted-primary">
              <MapPin className="w-4 h-4" />
              {profile.location}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
