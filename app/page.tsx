"use client";

import { API } from "./api/lib/api";
import SearchInput from "./components/searchInput";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <SearchInput
        onSubmit={async (val: string) => {
          const test = await API.searchUser(val);
          console.log("test", test);
        }}
        className="w-4/5 md:w-2/3 md:text-2xl lg:w-1/2 lg:text-3xl 2xl:text-4xl"
      />
      {/* <section>TEST</section> */}
      {/* <section></section> */}
    </div>
  );
}
