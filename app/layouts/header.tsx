"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import GithubIcon from "../assets/github.svg";
import SearchInput from "../components/searchInput";
import ThemeSwitchBtn from "../components/themeSwitchBtn";
import { HeadItem } from "../types";

interface props {
  type?: "main" | "default";
  itemList: HeadItem[];
}

export default function Header({ type = "default", itemList }: props) {
  const [val, setVal] = useState("");
  return (
    <header
      className="h-20 fixed w-full z-10 bg-transparent backdrop-blur-xl flex flex-row  justify-between items-center p-6 text-on-primary content-center"
      role="banner"
    >
      <Link href={"/"}>
        <GithubIcon className="fill-inverse" width={40} height={40} />
      </Link>
      <nav className="">
        <ul className="flex flex-row items-center gap-8">
          <SearchInput
            value={val}
            onChangeValue={(v) => setVal(v)}
            onSubmit={(v) => redirect(`/users/${v}`)}
            className={``}
          />
          {itemList.map((v) => {
            return (
              <li key={`header-link-${v.src}`}>
                <Link href={v.src}>{v.name}</Link>
              </li>
            );
          })}
          <ThemeSwitchBtn />
        </ul>
      </nav>
    </header>
  );
}
