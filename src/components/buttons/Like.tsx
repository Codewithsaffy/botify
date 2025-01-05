"use client";
import React, { useEffect } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai"; // Importing icons
import { useRouter } from "next/navigation";
import { createLikeIfNotExist, isLikePost } from "@/helper/apiCall/likes";
import { postNotification } from "@/helper/apiCall/notification";

const LikeBtn = ({
  likerId,
  postId,
  likerName,
  isAuthenticated,
  authorId,
  postSlug,
  likes,
}: {
  likerId?: string;
  postId: string;
  likerName: string;
  postSlug: string;
  authorId: string;
  isAuthenticated: boolean;
  likes: number;
}) => {
  const [isLike, setIsLike] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [noOfLikes, setNoOfLikes] = React.useState<null | string>(null);
  const router = useRouter();

  const CheckIsLike = async () => {
    if (!isAuthenticated) {
      return;
    }
    setIsLoading(true);
    try {
      setIsLike(!isLike);
      const res = await isLikePost(likerId!, postId);
      setIsLike(res?.data.isLike);
      setNoOfLikes(res?.data.noOfLikes);
      console.log(res?.data);
      console.log(res?.data.isLike);
    } catch (error) {
      setIsLike(isLike);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    CheckIsLike();
  }, []);

  const handleOnClick = async () => {
    if (!isAuthenticated) {
      router.push("/signin");
      return;
    }

    setIsLoading(true);
    try {
      const postFollower = await createLikeIfNotExist(likerId!, postId);
      await postNotification(
        authorId,
        `${likerName} liked your post`,
        `/blog/${postSlug}`
      );
      setIsLike(postFollower?.data.isLike || false);
      setNoOfLikes(postFollower?.data.noOfLikes);
      console.log(postFollower);
    } catch (error) {
      setIsLike(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => handleOnClick()} disabled={isLoading}>
        {isLike ? (
          <AiFillLike size={25} className="text-pink-600 hover:text-red-600 " />
        ) : (
          <AiOutlineLike
            size={25}
            className="text-pink-600 hover:text-green-600"
          />
        )}
      </button>
      <p className="text-sm text-gray-600">
        {noOfLikes === null ? likes : noOfLikes}
      </p>
    </div>
  );
};

export default LikeBtn;
