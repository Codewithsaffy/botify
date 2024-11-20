import React, { Suspense } from "react";
import BlogCard from "./BlogCard";
import { getAllBlogCards } from "@/helper/apiCall/blodCards";
import { CardData } from "../../../types";
import { Skeleton } from "@/components/ui/skeleton";

export const revalidate = 60;

const AllBlogCards = async ({ category }: { category: string }) => {
  const res = await getAllBlogCards(category);
  const cardData = await res?.data.posts;

  return (
    <div className="flex flex-col gap-8 py-6">
      {cardData?.map((cardData: CardData) => (
        <BlogCard key={cardData._id} cardData={cardData} />
      ))}
    </div>
  );
};

export default function AllBlogCardsWithSuspense({
  category,
}: {
  category: string;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col gap-8 py-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 border-b-[1px] border-gray-300 py-5 px-3 sm:px-4"
            >
              {/* Author Info */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>

              {/* Title and Description */}
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1 flex flex-col gap-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                <Skeleton className="h-[80px] w-[120px] sm:h-[107px] sm:w-[160px] rounded-md" />
              </div>

              {/* Footer Info */}
              <div className="flex gap-4 items-center">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          ))}
        </div>
      }
    >
      <AllBlogCards category={category} />
    </Suspense>
  );
}
