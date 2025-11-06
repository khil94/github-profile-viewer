"use client";

import { API } from "@/app/api/lib/api";
import { data, GithubContributionResponse, GithubUserItem } from "@/app/types";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import { useState, useTransition } from "react";
import CompatibilitySection from "./components/compatibilitySection";
import SearchSection from "./components/searchComponent";

interface userData {
  contributionData: GithubContributionResponse;
  userData: GithubUserItem;
}

export default function CompatibilityPage() {
  const [firstUer, setFirstUser] = useState<GithubUserItem>();
  const [secondUser, setSecondUser] = useState<GithubUserItem>();
  const [firstData, setFirstData] = useState<userData>();
  const [secondData, setSecondData] = useState<userData>();

  const [isPending, startTransition] = useTransition();

  const getUsersInfo = ({ first, second }: data<GithubUserItem>) => {
    const [firstLogin, secondLogin] = [first.login, second.login];
    startTransition(async () => {
      const [firstContribution, secondContribution] = await Promise.all([
        API.getUserContributionsByLogin(firstLogin),
        API.getUserContributionsByLogin(secondLogin),
      ]);
      setFirstData({
        contributionData: firstContribution,
        userData: first,
      });
      setSecondData({
        contributionData: secondContribution,
        userData: second,
      });
    });
  };

  return (
    <div className="flex flex-col gap-6 items-center">
      <section className="w-full flex flex-col md:grid md:grid-cols-2 gap-4">
        <SearchSection onChangeUser={(v) => setFirstUser(v)} />
        <SearchSection onChangeUser={(v) => setSecondUser(v)} />
      </section>
      <div className="flex flex-row gap-4">
        <Button
          className=" bg-theme hover:bg-accent-theme active:bg-accent-theme my-8 disabled:bg-muted-primary rounded-2xl"
          disabled={
            firstUer === undefined || secondUser === undefined || isPending
          }
          onClick={() =>
            getUsersInfo({ first: firstUer!, second: secondUser! })
          }
        >
          {isPending ? <LoaderIcon className=" animate-spin" /> : "궁합 계산"}
        </Button>
      </div>
      <CompatibilitySection first={firstData} second={secondData} />
    </div>
  );
}
