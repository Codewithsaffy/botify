import Image from "next/image";
import React from "react";
import { TUser } from "../../../../types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProfileBtn = async ({ user }: { user: TUser }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        {" "}
        <Image
          src={user.image}
          alt="profile"
          className="rounded-full h-9 w-9 outline-none"
          height={35}
          width={35}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileBtn;
