import Link from "next/link";
import React from "react";
import { FaMoon } from "react-icons/fa";

const Header = () => {
  return (
    <nav className="px-16 w-full flex h-14  items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-gray-950">Logo</h1>
      </div>

      <ul className="flex items-center gap-4">
        <li>
          <Link href={"/blogs"}>Blogs</Link>
        </li>
        <li>
          <Link href={"/about"}>About</Link>
        </li>
        <li>
          <Link href={"/category"}>Category</Link>
        </li>
        <li>
          <Link href={"/contact"}>Contact Us</Link>
        </li>
        <li>
          <button className="  bg-opacity-30 border-[1px]  rounded-lg .word-space-reduced text-gray-500 bg-gray-300 h-8 sm:w-64 text-start px-4">
            {" "}
            search blogs...
          </button>
        </li>
        <li>
          <FaMoon />
        </li>
      </ul>
    </nav>
  );
};

export default Header;
