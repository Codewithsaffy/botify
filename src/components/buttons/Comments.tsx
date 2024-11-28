"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getAllComments, postComment } from "@/helper/apiCall/comments";
import {
  FaComment,
  FaRegSmile,
  FaPaperPlane,
  FaSpinner,
  FaRegComment,
} from "react-icons/fa";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Comment, Commenter } from "../../../types";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { postNotification } from "@/helper/apiCall/notification";

const Comments = ({
  postId,
  authorId,
  postSlug,
  commenterDetail,
  isAuthenticated,
  initialCommentsNo,
}: {
  postId: string;
  authorId: string;
  postSlug: string;
  isAuthenticated: boolean;
  initialCommentsNo: number;
  commenterDetail: Commenter | null;
}) => {
  const router = useRouter();
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [commentInput, setCommentInput] = React.useState("");
  const [noOfComments, setNoOfComments] =
    React.useState<number>(initialCommentsNo);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);

  const handleCommentInput = async () => {
    if (!isAuthenticated) {
      return router.push("/signin");
    }
    if (!commentInput.trim()) return;

    setIsSending(true);

    try {
      const res = await postComment(
        commentInput,
        commenterDetail?._id!,
        postId
      );
      if (res?.data.commentData) {
        setCommentInput("");
        setNoOfComments(noOfComments + 1);
        setComments([
          {
            ...res?.data.commentData,
            commenter: {
              ...commenterDetail,
            },
          },
          ...comments,
        ]);
        await postNotification(
          authorId,
          `${commenterDetail?.name} commented on your post`,
          `/blog/${postSlug}`
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  const getComments = async () => {
    setIsLoading(true);
    try {
      const res = await getAllComments(postId);
      setComments(res?.data.comments || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger className="flex items-center gap-2 outline-none">
        <FaRegComment
          onClick={getComments}
          size={25}
          className="text-green-600 cursor-pointer hover:scale-110 transition-transform"
        />
        <p className="text-gray-500 text-sm">{noOfComments}</p>
      </SheetTrigger>

      <SheetContent className="overflow-y-auto p-2 sm:p-4">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            Comments <FaRegSmile className="text-yellow-500" />
          </SheetTitle>
          <SheetDescription>
            <div className="grid w-full gap-2 mt-4">
              <Textarea
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Write a comment..."
                value={commentInput}
                className="border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
              <Button
                onClick={handleCommentInput}
                disabled={!commentInput.trim() || isSending}
                className={`flex items-center justify-center gap-2 ${
                  !commentInput.trim() || isSending
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                } text-white`}
              >
                {isSending ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaPaperPlane />
                )}
                {isSending ? "Sending..." : "Send Comment"}
              </Button>
            </div>
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 mt-4 w-full">
          {isLoading ? (
            <div className="flex justify-center items-center text-gray-500">
              <FaSpinner className="text-2xl animate-spin" />
            </div>
          ) : comments.length > 0 ? (
            comments.map((comment: Comment) => (
              <div
                className="flex gap-4 p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                key={comment._id}
              >
                <Link href={`/profile/${comment.commenter.username}`}>
                  <Image
                    src={`/damyuser.avif`}
                    alt={`${comment.commenter.name} profile image`}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full border border-gray-300 object-cover"
                  />
                </Link>

                <div className="flex flex-col gap-2 flex-1">
                  <Link
                    href={`/profile/${comment.commenter.username}`}
                    className="text-sm font-semibold text-gray-900 hover:underline"
                  >
                    {comment.commenter.name}
                  </Link>

                  <p className="text-sm text-gray-700">{comment.comment}</p>

                  <p className="text-xs text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No comments yet.</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Comments;
