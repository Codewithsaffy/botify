import React from "react";
import { TUser } from "../../../../types";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import NotificationBtn from "./NotificationBtn";
import ProfileBtn from "./ProfileBtn";
import SearchBtn from "./SearchBtn";

const PrivateHeaderComponents = async ({ user }: { user: TUser }) => {
  return (
    <>
      <div className="flex h-full justify-center space-x-4 sm:space-x-8 items-center">
        <Link
          href={`/new-post/${user.username}/${user._id}`}
          className="sm:flex hidden  items-center justify-center gap-1  h-full"
        >
          <FiEdit size={25} className="text-[#6A4B3C]" />
          <p className="text-[#6A4B3C]">Write</p>
        </Link>
        <SearchBtn className="sm:hidden flex" />

        <NotificationBtn userId={user._id!} />
        <ProfileBtn user={user} />
      </div>
    </>
  );
};

export default PrivateHeaderComponents;
