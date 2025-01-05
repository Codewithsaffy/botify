import Image from "next/image";
import React from "react";
import { TUser } from "../../../../types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Logout from "@/components/buttons/Logout";
import { FaUser, FaEdit, FaSignOutAlt, FaUserEdit } from "react-icons/fa";

const ProfileBtn =  ({ user }: { user: TUser }) => {
  const email = decodeURIComponent(user.email);
  return (
    <DropdownMenu>
      {/* Profile Image as Trigger */}
      <DropdownMenuTrigger className="outline-none">
        <Image
          src={user.image}
          alt="profile"
          className="rounded-full h-10 w-10 border-2 border-gray-300 hover:border-blue-500 transition-all"
          height={40}
          width={40}
        />
      </DropdownMenuTrigger>

      {/* Dropdown Content */}
      <DropdownMenuContent className="w-56 bg-white shadow-lg rounded-lg py-2 border border-gray-200">
        {/* View Profile */}
        <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors">
          <FaUser className="text-blue-500" />
          <Link
            href={`/profile/${user.username}`}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-all"
          >
            View Profile
          </Link>
        </DropdownMenuItem>

        {/* Edit Profile */}
        <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors">
          <FaUserEdit className="text-yellow-500" />
          <Link
            href={`/profile/edit/${email}`}
            className="text-sm font-medium text-gray-700 hover:text-yellow-600 transition-all"
          >
            Edit Profile
          </Link>
        </DropdownMenuItem>

        {/* Write Post */}
        <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors">
          <FaEdit className="text-green-500" />
          <Link
            href={`/new-post/${user.username}/${user._id}`}
            className="text-sm font-medium text-gray-700 hover:text-green-600 transition-all"
          >
            Write Post
          </Link>
        </DropdownMenuItem>

        {/* Separator */}
        <DropdownMenuSeparator className="my-2 border-t border-gray-200" />

        {/* Logout */}
        <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors">
          <FaSignOutAlt className="text-red-500" />
          <Logout>
            <span className="text-sm font-medium text-gray-700 hover:text-red-600 transition-all">
              Logout
            </span>
          </Logout>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileBtn;
