"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Bookmark,
  GitBranch,
  Link,
  Mail,
  MapPin,
  Star,
  Users,
  X,
} from "lucide-react";
import { useBookmarkStore } from "../store/bookmark/bookmarkStore";
import { GithubUserItem } from "../types";
import NumberWithIcon from "./numberWithIconComponent";

interface props {
  profile: GithubUserItem;
  handleRemove?: (val: number) => void;
  type?: "default" | "full";
}
export default function UserCardComponent({
  profile,
  handleRemove,
  type = "default",
}: props) {
  const { isInBookmark, addBookmark, deleteBookmark } = useBookmarkStore();
  const isIn = isInBookmark(profile.id);

  function handleBookmark() {
    isIn ? deleteBookmark(profile.id) : addBookmark(profile);
  }

  return (
    <Card
      className={`h-full md:col-span-1 rounded-2xl bg-primary-container border-border p-4 md:p-6 ${
        type === "default" && "hover:border-accent-primary"
      }`}
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-row items-start">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage
              src={profile.avatar_url || "/placeholder.svg"}
              alt={profile.login}
            />
            <AvatarFallback className="bg-primary text-on-primary text-3xl">
              {profile.login.charAt(0)}
            </AvatarFallback>
          </Avatar>

          {/* 세부 정보 섹션 */}
          <div className="grid grid-cols-2 flex-1">
            {profile.followers !== undefined && (
              <NumberWithIcon
                number={profile.followers}
                Icon={Users}
                text="팔로워"
              />
            )}
            {profile.folliwing !== undefined && (
              <NumberWithIcon
                number={profile.folliwing}
                Icon={Users}
                text="팔로잉"
              />
            )}
            <NumberWithIcon
              number={profile.public_repos}
              Icon={GitBranch}
              text="저장소"
            />

            <NumberWithIcon
              number={profile.public_gists}
              Icon={Star}
              text="Gists"
            />
          </div>

          <div className="flex flex-row gap-2 items-center">
            <Button
              className={`${!isIn && "hover:text-blue-500"} m-0`}
              size={"icon-lg"}
              onClick={(e) => {
                e.preventDefault();
                handleBookmark();
              }}
              variant={"ghost"}
            >
              <Bookmark
                className={`${
                  isIn ? "text-blue-500 fill-blue-500" : "hover:text-blue-500"
                }`}
              />
            </Button>
            {handleRemove && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  handleRemove(profile.id);
                }}
                className="hover:opacity-50 transition-opacity"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 w-full">
          {/* 이름 등 신상 섹션 */}
          <div className="col-span-2-2 flex flex-col gap-2">
            {profile.name && (
              <h3 className="text-xl font-bold text-on-primary-container">
                {profile.name}
              </h3>
            )}
            {profile.login && (
              <p className=" text-sm text-on-muted-primary">@{profile.login}</p>
            )}
            {type === "full" && (
              <p className="text-on-muted-primary text-sm">{profile.bio}</p>
            )}
          </div>
          {/* 위치 이메일 등 섹션 */}
          <div className=" col-span-3 flex flex-col items-start gap-2 ">
            {profile.location && (
              <div className="flex items-center gap-1 text-sm text-on-muted-primary">
                <MapPin className="w-4 h-4" />
                {profile.location}
              </div>
            )}
            {profile.blog && (
              <div className="flex items-center gap-1 text-sm text-on-muted-primary">
                <Link className="w-4 h-4" />
                {type === "default" ? (
                  <p className="">{profile.blog}</p>
                ) : (
                  <a
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-link"
                    href={profile.blog}
                  >
                    {profile.blog}
                  </a>
                )}
              </div>
            )}
            {profile.email && (
              <div className="flex items-center gap-1 text-sm text-on-muted-primary">
                <Mail className="w-4 h-4" />
                {profile.email}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
