"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useToast } from "@/hooks/use-toast";

import { HiDotsVertical } from "react-icons/hi";
import { deletePost } from "@/helper/apiCall/post";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

const PostEditOrDelete = ({
  username,
  postId,
  isAuthenticated,
}: {
  username: string;
  postId: string;
  isAuthenticated: boolean;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    if (!isAuthenticated) {
      router.push("/signin");
    }
    setLoading(true);
    try {
      const res = await deletePost(postId);
      toast({
        description: res?.data.message,
      });
    } catch (error) {
      toast({
        description: "Failed to delete post",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="absolute bottom-2 right-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <HiDotsVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href={`/edit/${username}/${postId}`}>Edit</Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem> */}
          <AlertDialog>
            <AlertDialogTrigger className="text-sm cursor-default p-2 hover:bg-gray-100 rounded-md w-full text-left">
              Delete
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your post and remove your post from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete()}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {/* </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PostEditOrDelete;
