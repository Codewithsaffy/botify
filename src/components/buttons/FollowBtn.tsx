"use client";
import React, { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai"; // Importing icons
import { createFollowerIfNotExist, isFollow } from "@/helper/apiCall/follow";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const FollowBtn = ({
  userId,
  AuthorId,
  isAuthenticated,
  simple,
}: {
  userId: string;
  AuthorId: string;
  isAuthenticated: boolean;
  simple: boolean;
}) => {
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const CheckIsFollowing = async () => {
    if (!isAuthenticated) {
      return;
    }
    setIsLoading(true);
    try {
      const res = await isFollow(userId, AuthorId);
      setIsFollowing(res?.data.isFollow || false);
    } catch (error) {
      setIsFollowing(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    CheckIsFollowing();
  }, []);

  const handleOnClick = async () => {
    if (!isAuthenticated) {
      router.push("/signin");
      return;
    }

    setIsLoading(true);
    try {
      const postFollower = await createFollowerIfNotExist(userId, AuthorId);
      setIsFollowing(postFollower?.data.isFollow || false);
    } catch (error) {
      setIsFollowing(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className={`flex items-center justify-center gap-2 text-sm font-medium rounded-full 
        ${
          simple
            ? // Simple design
              `bg-white text-gray-600 p-0  font-normal hover:text-gray-900 shadow-none text-base hover:bg-white`
            : isFollowing
            ? // Following design
              `bg-[#3b82f6] text-white hover:bg-[#2563eb]`
            : // Default Follow design
              `bg-gray-100 text-[#3b82f6] hover:bg-gray-200`
        } 
        transition-all duration-200 ${
          isLoading ? "cursor-not-allowed opacity-50" : ""
        }`}
      onClick={handleOnClick}
      disabled={isLoading}
    >
      {isFollowing ? (
        <>Following</>
      ) : (
        <>
          <AiOutlinePlus className="text-lg" /> Follow
        </>
      )}
    </Button>
  );
};

export default FollowBtn;
