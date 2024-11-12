
import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { doSocialLogin } from "@/actions/socialLogin"; // Ensure this import is correct

const RegisterPage = async () => {
 
  const session = await auth();
  console.log(session?.user);
  if (session?.user) redirect("/dashboard");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
        {/* Header */}
        <h1 className="text-center mb-1 font-extrabold text-2xl text-gray-800">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-600 mb-4 text-sm">
          Log in to access your account.
        </p>

        {/* Credentials Login Form */}
        {/* <CredentialForm /> */}

        {/* Separator */}
        <div className="flex items-center justify-center mb-3">
          <hr className="w-full border-gray-300" />
          <span className="mx-2 text-gray-500 text-xs">Or</span>
          <hr className="w-full border-gray-300" />
        </div>

        {/* Social Login Buttons */}
        <form
          action={doSocialLogin}
          className="flex flex-col items-center gap-2 mb-4"
        >
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 p-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
            name="action"
            value="google"
          >
            <FaGoogle size={18} />
            <span>Google</span>
          </button>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 p-3 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
            name="action"
            value="github"
          >
            <FaGithub size={18} />
            <span>GitHub</span>
          </button>
        </form>

        {/* Terms and Privacy Links */}
        <p className="text-center text-gray-500 text-xs">
          By logging in, you agree to our{" "}
          <a href="#" className="text-blue-500 underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 underline">
            Privacy Policy
          </a>
          . If you don’t have an account,{" "}
          <a href="/register" className="text-blue-500 underline">
            register here
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
