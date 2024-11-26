import React, { Suspense } from "react";
import CategoryBar from "@/components/CustomComponents/homePageComp/CategoryBar";
import AllBlogCards from "@/components/cards/AllBlogCards";
import RecomendedAuthors from "@/components/cards/RecomendedAuthors";
import { Skeleton } from "@/components/ui/skeleton";

export const revalidate = 60;

const BlogCardsLoader = () => (
  <div className="flex flex-col gap-4 py-5">
    {[...Array(3)].map((_, idx) => (
      <Skeleton key={idx} className="w-full h-32 rounded-md" />
    ))}
  </div>
);

const AuthorsLoader = () => (
  <div className="flex flex-col gap-4">
    {[...Array(5)].map((_, idx) => (
      <div key={idx} className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <Skeleton className="h-6 w-32" />
      </div>
    ))}
  </div>
);

const CategoryBarLoader = () => (
  <div className="flex gap-2 overflow-x-auto px-2">
    {[...Array(5)].map((_, idx) => (
      <Skeleton key={idx} className="h-10 w-24 rounded-md" />
    ))}
  </div>
);

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = searchParams?.category || "All";

  return (
    <div className="relative flex max-w-screen justify-around">
      {/* Left Content */}
      <div className="flex flex-col w-full md:max-w-[520px] px-0 lg:px-0 lg:max-w-[750px] h-full">
        <Suspense fallback={<CategoryBarLoader />}>
          <CategoryBar />
        </Suspense>
        <div className="flex flex-col gap-10 pt-2  sm:pt-5">
          <Suspense fallback={<BlogCardsLoader />}>
            <AllBlogCards category={category as string} />
          </Suspense>
        </div>
      </div>

      <div className="md:flex hidden md:w-[600px] sticky w-full top-[56px] lg:w-[400px] border-l border-gray-300 px-5 py-10 h-[calc(100vh-64px)]">
        <Suspense fallback={<AuthorsLoader />}>
          <RecomendedAuthors />
        </Suspense>
      </div>
    </div>
  );
}
