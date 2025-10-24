import Link from "next/link";
import { HeadItem } from "../types";

interface props {
  type?: "main" | "default";
  itemList: HeadItem[];
}

export default function Header({ type = "default", itemList }: props) {
  return (
    <header
      className="h-20 flex flex-row justify-between p-6 bg-secondary-container text-on-secondary-container content-center"
      role="banner"
    >
      <Link href={"/"}>home</Link>
      <nav className="">
        <ul className="flex flex-row gap-8">
          {itemList.map((v) => {
            return (
              <li key={`header-link-${v.src}`}>
                <Link href={v.src}>{v.name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
