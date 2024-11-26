import { isAuthenticated } from "@/actions/authentication";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import SearchBtn from "../CustomComponents/headerComp/SearchBtn";
import PrivateHeaderComponents from "../CustomComponents/headerComp/PrivateHeaderComponents";

const HeaderComponent = async () => {
  const authenticated = await isAuthenticated();

  return (
    <nav className="flex justify-between sticky top-0 bg-white z-10 border-b-[1px] border-gray-300 items-center px-4 sm:px-6 h-14">
      <div className="flex justify-between items-center gap-8">
        <Link className="flex justify-center  items-center gap-1" href={"/"}>
        <Image
          src={"/logo/logo.png"}
          alt="Botify"
          height={40}
          width={40}
          className="h-[30px] w-[30px] sm:block hidden"
        />
          <Image
            src={"/logo/logoname.png"}
            alt="Botify"
            height={80}
            width={80}
            className="sm:h-[30px] sm:w-[80px] h-[30px] w-[80px]"
          />
        </Link>
        <SearchBtn className="sm:flex hidden"/>
      </div>
      {authenticated.user && authenticated.isAuthenticated ? (
        <PrivateHeaderComponents user={authenticated.user} />
      ) : (
        <Link
          href="/signin"
          className="flex items-center justify-center gap-1 rounded-full bg-gray-900 text-white px-4 py-2"
        >
          Get Started
        </Link>
      )}
    </nav>
  );
};

export default async function Header() {
  return (
    <Suspense
      fallback={
        <nav className="flex justify-between items-center px-6 h-14 animate-pulse">
          <div className="flex justify-between items-center gap-4">
            <div className="h-10 w-20 bg-gray-300 rounded"></div>
            <div className="h-8 w-32 bg-gray-300 rounded"></div>
          </div>
          <div className="h-8 w-24 bg-gray-300 rounded"></div>
        </nav>
      }
    >
      <HeaderComponent />
    </Suspense>
  );
}
