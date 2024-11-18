import { getRecommendedAuthosr } from "@/helper/apiCall/remocommended";
import Link from "next/link";
import React from "react";
import FollowBtn from "../buttons/FollowBtn";
import Image from "next/image";
import { isAuthenticated } from "@/actions/authentication";
import { redirect } from "next/navigation";

export const revalidate = 60;
const RecomendedAuthors = async () => {
  const userId = (await isAuthenticated()).user?._id?.toString();
  if (!userId) return redirect("/signin");
  const authors = await getRecommendedAuthosr(userId);
  const { recommendedAuthors } = authors?.data;
  return (
    <div className="flex flex-col gap-6 w-full">
      <h2 className="text-xl font-semibold text-gray-800">
        Recommended Authors
      </h2>
      <div className="flex flex-col gap-4">
        {recommendedAuthors.length > 0 &&
          recommendedAuthors.map((author: any) => (
            <div
              key={author._id}
              className="flex justify-between items-center gap-4 w-full"
            >
              <Link
                href={`/profile/${author.username}`}
                key={author._id}
                className="flex flex-col gap-2 w-full"
              >
                <div className="flex gap-2 items-center">
                  <Image
                    src={"/damyuser.avif"}
                    alt="user image"
                    width={32}
                    height={32}
                    quality={80}
                    priority
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <h3 className="hover:underline text-xs sm:text-sm text-gray-700 font-medium">
                    {author.name}
                  </h3>
                </div>
              </Link>
              <FollowBtn userId={author._id} AuthorId={author._id} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecomendedAuthors;
