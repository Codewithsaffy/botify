import React from "react";
import UserInput from "./UserInput";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();
  return (
    <div>
      <UserInput session={session!} />
    </div>
  );
};

export default page;
