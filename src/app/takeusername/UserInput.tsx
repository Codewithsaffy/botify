"use client";
import { registerUser } from "@/helper/apiCall/user.api";
import { Session } from "next-auth";
import React, { useState } from "react";


const UserInput = ({ session }: { session: Session }) => {
  if (!session?.user) return null;
  const user = session.user?.email?.split("@")[0];
  const [username, setUsername] = useState(user as string);

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await registerUser({
        username: username,
        email: session.user?.email!,
        image: session.user?.image!,
        name: session.user?.name!,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={(e) => handleSubmit(e)}>submit</button>
    </div>
  );
};

export default UserInput;
