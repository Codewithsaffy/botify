import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import React from "react";
import { doLogout } from "@/actions/socialLogin";
import { FaUserCircle } from "react-icons/fa";

const DashboardPage = async () => {
  const session = await auth();

  if (!session?.user) redirect("/register");

  return (
    <form
      action={doLogout}
      className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-6"
    >
      <nav className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome, {session.user.name}!
        </h1>
        <p className="text-gray-600 mb-10 text-lg">
          Manage your account and explore exclusive features.
        </p>

        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="rounded-full overflow-hidden border-4 border-purple-500 shadow-lg">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name!}
                height={100}
                width={100}
                className="rounded-full"
              />
            ) : (
              <FaUserCircle className="text-gray-400" size={100} />
            )}
          </div>
          <h2 className="text-2xl font-semibold text-gray-700">
            {session.user.name}
          </h2>
          <p className="text-gray-500">{session.user.email}</p>
        </div>

        <div className="flex justify-center gap-4">
          <button
            type="button"
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Explore Features
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Logout
          </button>
        </div>
      </nav>
    </form>
  );
};

export default DashboardPage;
