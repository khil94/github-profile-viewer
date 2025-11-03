"use client";
import { redirect } from "next/navigation";
import { useState } from "react";
import RecentlyViewedSection from "./components/recentlyViewedSection";
import SearchInput from "./components/searchInput";
import Header from "./layouts/header";

export default function Home() {
  const [val, setVal] = useState("");

  return (
    <div className="min-h-screen w-full flex flex-col items-center ">
      <Header />
      <section className="min-h-screen from-20% from-primary-container to-primary bg-linear-to-b w-full text-center content-center space-y-4">
        <h1 className="text-4xl font-bold opacity-90">
          Github 프로필을 분석해보세요
        </h1>
        <h2 className="text-on-muted-primary mb-6">
          사용자의 저장소, 기여도, 통계를 한눈에 확인하세요
        </h2>
        <SearchInput
          value={val}
          placeholder="Github 사용자명을 입력하세요"
          onChangeValue={(v) => setVal(v)}
          onSubmit={(v) => redirect(`/users/${v}`)}
          className="w-4/5 md:w-2/3 m-auto md:text-2xl lg:w-1/2"
        />
      </section>
      <RecentlyViewedSection />
    </div>
  );
}
