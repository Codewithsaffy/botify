import React from "react";
import BlogCard from "./BlogCard";
import { getAllBlogCards } from "@/helper/apiCall/blodCards";
import { CardData } from "../../../types";

// Revalidate every 60 seconds
export const revalidate = 60;

const AllBlogCards = async ({ category }: { category: string }) => {
  const res = await getAllBlogCards(category);
  const cardData = await res?.data.posts;
  return (
    <div className="flex flex-col gap-10 py-5">
      {cardData?.map((cardData: CardData) => (
        <BlogCard key={cardData._id} cardData={cardData} />
      ))}
    </div>
  );
};

export default AllBlogCards;
