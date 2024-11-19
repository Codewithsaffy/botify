"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getAllComments } from "@/helper/apiCall/comments";

import React from "react";
import { FaComment } from "react-icons/fa";

const Comments = ({
  postId,
  isAuthenticated,
  commentNo,
}: {
  postId: string;
  isAuthenticated: boolean;
  commentNo: number;
}) => {
  const [comments, setComments] = React.useState([]);
  const [noOfComments, setNoOfComments] = React.useState<null | number>(
    null
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const getComments = async () => {
    setIsLoading(true);
    try {
      const res = await getAllComments(postId);
      if (!res?.data.comments) {
        setComments([]);
        setNoOfComments(noOfComments);
      }
      setNoOfComments(res?.data.noOfComments);
      setComments(res?.data.comments);
      console.log("comments", res?.data.comments)
      console.log(res?.data)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Sheet>
      <SheetTrigger>
        <FaComment onClick={() => getComments()} size={25} className="text-green-600" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Comments</SheetTitle>
          <SheetDescription>
            {noOfComments} comments
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          {
           comments && comments.map((comment: any) => (
              <div key={comment._id}>
                <p>{comment.comment}</p>
              </div>
            ))
          }
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Comments;
