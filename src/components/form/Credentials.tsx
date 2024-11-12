"use client";
import { credentialsLogin } from "@/actions/socialLogin";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CredentialForm = () => {
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const response = await credentialsLogin(formData);
      if (!!response) {
      }
      router.push("/dashboard");
    } catch (err) {
      console.log(err)
      setMessage("email or password is incorrect");
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
      {message && (
        <p className="text-red-500 font-semibold my-2 text-center">{message}</p>
      )}
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        required
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        aria-label="Email Address"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        aria-label="Password"
      />
      <button
        type="submit"
        className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
      >
        Log In
      </button>
    </form>
  );
};

export default CredentialForm;
