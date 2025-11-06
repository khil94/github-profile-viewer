import { Bookmark, Heart } from "lucide-react";
import Link from "next/link";
import GithubIcon from "../assets/github.svg";
import ThemeSwitchBtn from "../components/themeSwitchBtn";

export default function Header() {
  return (
    <header
      className="px-[10%] h-20 fixed w-full z-10 bg-transparent backdrop-blur-xl flex flex-row  justify-between items-center p-6 text-on-primary content-center"
      role="banner"
    >
      <Link href={"/"} className="flex flex-row gap-4 items-center">
        <GithubIcon className="fill-inverse" width={40} height={40} />
        <p className="hidden md:block font-bold text-2xl">Github Viewer</p>
      </Link>
      <nav className="">
        <ul className="flex flex-row items-center gap-8">
          <li className="md:hover:bg-accent-primary active:bg-accent-primary p-2 rounded-2xl active:text-on-accent-primary md:hover:text-on-accent-primary">
            <Link
              href={"/compatibility"}
              className="flex flex-row gap-2 items-center"
            >
              <Heart />
              <p className="hidden md:block">{"궁합"}</p>
            </Link>
          </li>
          <li className="md:hover:bg-accent-primary active:bg-accent-primary p-2 rounded-2xl active:text-on-accent-primary md:hover:text-on-accent-primary">
            <Link
              href={"/bookmark"}
              className="flex flex-row gap-2 items-center"
            >
              <Bookmark />
              <p className="hidden md:block">{"북마크"}</p>
            </Link>
          </li>
          <ThemeSwitchBtn />
        </ul>
      </nav>
    </header>
  );
}
