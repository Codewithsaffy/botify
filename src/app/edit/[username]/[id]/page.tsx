"use client";

import React, { useEffect, useState, Suspense } from "react";
import { getPostContent, updatePost } from "../../../../helper/apiCall/post";
import RichTextEditor from "@/components/CustomComponents/NewPost/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FaSpinner } from "react-icons/fa";
import { toast } from "@/hooks/use-toast";
import {  useRouter } from "next/navigation";

const Page = ({ params }: { params: { username: string; id: string } }) => {
  const _id = decodeURIComponent(params.id);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const res = await getPostContent(_id);
        if (res?.data.postContent.content === null) {
          toast({
            description: "Post not found",
          });
        }
        setContent(res?.data.postContent.content);
      } catch (error) {
        toast({
          description: "Failed to fetch post content",
        });
        throw new Error("Failed to fetch post content");
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handlePublish = async () => {
    setIsUpdating(true);
    try {
      const res = await updatePost(_id, content);
      toast({
        description: "Post Published Successfully!",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
      toast({
        description: "Failed to publish the post",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-8 relative">
      <Suspense
        fallback={
          <div className="flex flex-col max-w-5xl gap-6 mx-auto animate-pulse p-4">
            <Skeleton className="w-full h-12 mb-6" /> {/* Title Skeleton */}
            <Skeleton className="w-full h-40 sm:h-48 md:h-60 rounded-md" />{" "}
            {/* Editor Skeleton */}
            <div className="flex justify-end mt-6">
              <Skeleton className="h-10 w-32 rounded-lg" />{" "}
              {/* Button Skeleton */}
            </div>
          </div>
        }
      >
        {isLoading ? (
          <div className="flex flex-col max-w-5xl gap-6 mx-auto animate-pulse p-4">
            <Skeleton className="w-full h-12 mb-6" /> {/* Title Skeleton */}
            <Skeleton className="w-full h-40 sm:h-48 md:h-60 rounded-md" />{" "}
            {/* Editor Skeleton */}
            <div className="flex justify-end mt-6">
              <Skeleton className="h-10 w-32 rounded-lg" />{" "}
              {/* Button Skeleton */}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
            {/* Publish Button at the Top-Right */}
            <div className="absolute top-4 right-4">
              <Button
                onClick={handlePublish}
                disabled={isUpdating} // Disable button during publishing
                className={`bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-lg shadow-md font-medium ${
                  isUpdating && "opacity-70 cursor-not-allowed"
                }`}
              >
                {isUpdating ? (
                  <>
                    <FaSpinner className="animate-spin mr-2 h-5 w-5" />
                    Publishing...
                  </>
                ) : (
                  "Publish"
                )}
              </Button>
            </div>

            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Edit Post Content
            </h1>
            <RichTextEditor
              value={content}
              setValue={(value) => setContent(value)}
            />
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default Page;
