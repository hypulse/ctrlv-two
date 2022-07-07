import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import wordmark from "../public/wordmark.png";
import wordmark_dark from "../public/wordmark_dark.png";
import graphic from "../public/graphic.png";

const darkIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

const lightIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const sysIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
      clipRule="evenodd"
    />
  </svg>
);

const Home: NextPage = () => {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleThemeMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  const [theme, setTheme] = useState("light");
  const [sysTheme, setSysTheme] = useState("light");
  const themeChainging = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    themeChainging();
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        setSysTheme(e.matches ? "dark" : "light");
      });
  });

  const webShare = async (text: string) => {
    if (navigator.share) {
      await navigator.share({
        title: document.title,
        url: document.location.href,
        text,
      });
    } else {
      alert("hi");
      // copyToClipboard(url, "클립보드에 주소가 복사되었습니다.");
    }
  };

  return (
    <>
      <Head>
        <title>Online CtrlV</title>
        <meta property="og:title" content="Online CtrlV" />
        <meta property="og:site_name" content="Online CtrlV" />
        {/* <meta property="og:url" content="https://ogp.me/" /> */}
        {/* <meta property="og:description" content="안녕하세여!!히히" /> */}
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
      </Head>
      <nav className="flex items-center h-16 px-6 space-x-2 transition-colors border-b dark:border-slate-700">
        <div className="flex w-44">
          {theme === "light" ? <Image alt="" src={wordmark}></Image> : ""}
          {theme === "dark" ? <Image alt="" src={wordmark_dark}></Image> : ""}
          {theme === "system" ? (
            sysTheme === "dark" ? (
              <Image alt="" src={wordmark_dark}></Image>
            ) : (
              <Image alt="" src={wordmark}></Image>
            )
          ) : (
            ""
          )}
        </div>
        <div className="grow"></div>
        <div
          className="p-2 transition-colors rounded-full cursor-pointer text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 hover:bg-gray-400/10"
          onClick={() => {
            toggleThemeMenu();
          }}
        >
          {theme === "light" ? lightIcon : ""}
          {theme === "dark" ? darkIcon : ""}
          {theme === "system"
            ? sysTheme === "dark"
              ? darkIcon
              : lightIcon
            : ""}
        </div>
        <div
          className="p-2 transition-colors rounded-full cursor-pointer text-slate-400 hover:text-slate-500 hover:bg-gray-400/10 dark:hover:text-slate-300"
          onClick={() => {
            webShare(locale == "ko" ? "친구에게 보내는 무한 복붙 메시지!" : "");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
        </div>
      </nav>
      <div className="relative">
        <div
          className={`absolute flex-col rounded border py-1 w-36 right-0 mx-6 my-4 text-sm font-bold text-slate-400 dark:bg-slate-700 dark:border-none bg-white ${
            menuOpen ? "flex" : "hidden"
          }`}
        >
          <div
            className={`flex items-center py-1 px-2 cursor-pointer space-x-2 hover:bg-gray-400/10 ${
              theme === "light" ? "text-sky-500" : ""
            }`}
            onClick={() => {
              toggleThemeMenu();
              setTheme("light");
              themeChainging();
              localStorage.theme = "light";
            }}
          >
            <div>{lightIcon}</div>
            <div
              className={`${
                theme === "light"
                  ? "text-sky-500"
                  : "text-slate-700 dark:text-white"
              }`}
            >
              Light
            </div>
          </div>
          <div
            className={`flex items-center py-1 px-2 cursor-pointer space-x-2 hover:bg-gray-400/10 ${
              theme === "dark" ? "text-sky-500" : ""
            }`}
            onClick={() => {
              toggleThemeMenu();
              setTheme("dark");
              themeChainging();
              localStorage.theme = "dark";
            }}
          >
            <div>{darkIcon}</div>
            <div
              className={`${
                theme === "dark"
                  ? "text-sky-500"
                  : "text-slate-700 dark:text-white"
              }`}
            >
              Dark
            </div>
          </div>
          <div
            className={`flex items-center py-1 px-2 cursor-pointer space-x-2 hover:bg-gray-400/10 ${
              theme === "system" ? "text-sky-500" : ""
            }`}
            onClick={() => {
              toggleThemeMenu();
              setTheme("system");
              themeChainging();
              localStorage.removeItem("theme");
            }}
          >
            <div>{sysIcon}</div>
            <div
              className={`${
                theme === "system"
                  ? "text-sky-500"
                  : "text-slate-700 dark:text-white"
              }`}
            >
              System
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center px-6 py-16 space-y-16">
        <div className="flex flex-col items-center space-y-8">
          <div className="text-6xl">🖨️</div>
          <div className="max-w-xl text-2xl text-center text-slate-500 dark:text-slate-400">
            {locale == "ko"
              ? "모바일 환경에서도 여러 번 복사하고 붙여넣을 수 있습니다!"
              : "You can copy and paste multiple times, even on mobile!"}
          </div>
        </div>
        <div className="flex flex-col w-full max-w-4xl space-y-4">
          <textarea
            className="w-full h-48 p-2 overflow-y-scroll border rounded dark:border-none"
            placeholder={
              locale == "ko"
                ? "복사할 텍스트를 입력하세요."
                : "Enter the text you want to copy."
            }
            style={{ resize: "none" }}
          ></textarea>
          <div className="flex flex-wrap -m-2">
            <select
              className="h-10 m-2 transition-colors bg-transparent border-b cursor-pointer basis-full sm:basis-0 sm:grow hover:border-b-2 focus:border-b-2 dark:text-white focus:border-blue-600 dark:focus:border-blue-600 dark:border-slate-700"
              defaultValue="100"
            >
              <option value="10" className="text-black">
                {locale == "ko" ? "10 번" : "10 Times"}
              </option>
              <option value="50" className="text-black">
                {locale == "ko" ? "50 번" : "50 Times"}
              </option>
              <option value="100" className="text-black">
                {locale == "ko" ? "100 번" : "100 Times"}
              </option>
              <option value="500" className="text-black">
                {locale == "ko" ? "500 번" : "500 Times"}
              </option>
              <option value="1000" className="text-black">
                {locale == "ko" ? "1000 번" : "1000 Times"}
              </option>
            </select>
            <button className="h-10 m-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600 basis-full sm:basis-0 sm:grow">
              {locale == "ko" ? "복사하기" : "Copying"}
            </button>
          </div>
        </div>
      </div>
      <footer className="flex justify-center py-12 space-x-6 text-sm text-slate-500 dark:text-slate-400">
        <div>
          <select
            className="bg-transparent cursor-pointer"
            defaultValue={locale}
            onChange={(e) => {
              router.push("/", "/", { locale: e.target.value });
            }}
          >
            {locales?.map((e, i) => (
              <option value={e} className="text-black" key={i}>
                {e === "ko" ? "한국어" : "English"}
              </option>
            ))}
          </select>
        </div>
        <div>&copy; {new Date().getFullYear()} Online CtrlV 2</div>
      </footer>
    </>
  );
};

export default Home;
