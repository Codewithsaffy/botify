import React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { doSocialLogin } from "@/actions/authentication";
import FaceBookButton from "@/components/buttons/FaceBookButton";

const SocialProviderData = [
  {
    value: "google",
    icon: <FcGoogle size={20} />,
    name: "Google",
  },
  {
    value: "github",
    icon: <FaGithub size={20} />,
    name: "Github",
  },
];

const RegisterPage = async () => {


 return (
    <main className="flex justify-center items-center h-screen bg-gray-50">
      <section className="flex flex-col text-center justify-center items-center max-w-4xl w-full shadow-lg bg-white rounded-lg p-6 sm:p-8 md:p-10 space-y-6">
        <div className="space-y-4 mb-8">
          <h1 className="text-2xl font-bold font-lora sm:text-3xl mb-2 max-w-[450px]">
            Connect Easily Using Your Preferred Social Account
          </h1>
        </div>
        <form
          action={doSocialLogin}
          className="flex flex-col items-center gap-2 mb-8"
        >
          {SocialProviderData.map((provider) => (
            <button
              key={provider.value}
              type="submit"
              className="flex group justify-start items-center border border-black rounded-full w-[300px] p-3 transition-colors duration-200 hover:bg-gray-900 hover:text-white "
              name="action"
              value={provider.value}
            >
              {provider.icon}
              <span className="w-full text-center ml-3">Continue with {provider.name}</span>
            </button>
          ))}
          <FaceBookButton />
        </form>
        <p className="text-sm text-gray-600 max-w-[450px]">
          By logging in, you agree to our{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
          . If you don’t have an account, register here.
        </p>
      </section>
    </main>
  );
};

export default RegisterPage;
