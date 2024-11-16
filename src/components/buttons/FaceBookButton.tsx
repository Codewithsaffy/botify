"use client";
import { useToast } from "@/hooks/use-toast";

import React from "react";
import { FaFacebook } from "react-icons/fa";

const FaceBookButton = () => {
  const { toast } = useToast();
  const handleClick = () => {
    toast({
      title: "This feature is not available yet",
    });
  };
  return (
    <div
      onClick={() => handleClick()}
      className="flex  justify-start items-center border border-black rounded-full w-[300px] p-3 transition-colors duration-200 hover:bg-gray-900 hover:text-white"
    >
      <FaFacebook className="text-blue-600" size={20}/>
      <span className="w-full text-center">Continue with Facebook</span>
    </div>
  );
};

export default FaceBookButton;
