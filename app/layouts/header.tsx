import Link from "next/link";
import SearchInput from "../components/searchInput";
import ThemeSwitchBtn from "../components/themeSwitchBtn";
import { HeadItem } from "../types";

interface props {
  type?: "main" | "default";
  itemList: HeadItem[];
}

export default function Header({ type = "default", itemList }: props) {
  return (
    <header
      className="h-20 flex flex-row justify-between items-center p-6 bg-primary text-on-primary content-center"
      role="banner"
    >
      <Link href={"/"}>home</Link>
      <nav className="">
        <ul className="flex flex-row items-center gap-8">
          <SearchInput className={``} />
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
