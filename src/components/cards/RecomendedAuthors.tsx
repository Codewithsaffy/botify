import { getRecommendedAuthosr } from "@/helper/apiCall/remocommended";
import Link from "next/link";
import React from "react";
import FollowBtn from "../buttons/FollowBtn";
import Image from "next/image";
import { isAuthenticated } from "@/actions/authentication";

export const revalidate = 60;

const RecommendedAuthors = async () => {
  try {
    const auth = await isAuthenticated();
    const userId = auth?.user?._id?.toString();
    const authors = await getRecommendedAuthosr(userId! || "");
    const recommendedAuthors = authors?.data?.recommendedAuthors;
    console.log(
      "authors" + authors?.data.recommendedAuthors,
      "userId" + userId
    );

    return (
      <div className="flex flex-col gap-6 w-full">
        <h2 className="text-xl font-semibold text-gray-800">
          Recommended Authors
        </h2>
        <div className="flex flex-col gap-4">
          {recommendedAuthors.length > 0 ? (
            recommendedAuthors.map((author: any) => (
              <div
                key={author._id}
                className="flex justify-between items-center gap-4 w-full"
              >
                <Link
                  href={`/profile/${author.username}`}
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
                <FollowBtn
                  simple={false}
                  isAuthenticated={auth.isAuthenticated}
                  userId={userId!}
                  AuthorId={author._id}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">
              No recommended authors found.
            </p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching recommended authors:", error);
    return (
      <div className="flex flex-col gap-6 w-full">
        <h2 className="text-xl font-semibold text-gray-800">
          Recommended Authors
        </h2>
        <p className="text-red-500 text-sm">
          Failed to load recommended authors.
        </p>
      </div>
    );
  }
};

export default RecommendedAuthors;
