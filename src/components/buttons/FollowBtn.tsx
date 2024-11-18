"use client";
import React, { useEffect } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai"; // Importing icons
import { createFollowerIfNotExist, isFollow } from "@/helper/apiCall/follow";
import { Button } from "../ui/button";

const FollowBtn = ({
  userId,
  AuthorId,
}: {
  userId: string;
  AuthorId: string;
}) => {
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const CheckIsFollowing = async () => {
    setIsLoading(true);
    try {
      const res = await isFollow(userId, AuthorId);
      setIsFollowing(res?.data.isFollow);
      console.log(res);
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
    setIsLoading(true);
    setIsFollowing(!isFollowing);
    try {
      const postFollower = await createFollowerIfNotExist(userId, AuthorId);
      console.log(postFollower);
      if (postFollower?.data.isFollow) {
        setIsFollowing(true);
      } else if (!postFollower?.data.isFollow) {
        setIsFollowing(false);
      }
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
          isFollowing
            ? "hover:bg-gray-900 bg-[#3b82f6] text-gray-200"
            : "bg-gray-100 text-[#3b82f6] hover:bg-gray-200"
        } transition-all duration-200 ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
      onClick={handleOnClick}
      disabled={isLoading}
    >
      {isFollowing ? (
        <>
           Following
        </>
      ) : (
        <>
          <AiOutlinePlus className="text-lg" /> Follow
        </>
      )}
    </Button>
  );
};

export default FollowBtn;
