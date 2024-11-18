// import { getAllUsers } from "@/helper/apiCall/user.api";

import CategoryBar from "@/components/CustomComponents/homePageComp/CategoryBar";
import AllBlogCards from "@/components/cards/AllBlogCards";
import RecomendedAuthors from "@/components/cards/RecomendedAuthors";
export const revalidate = 60;
export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = searchParams?.category || "All";
  return (
    <div className="relative  flex max-w-screen justify-around ">
      <div className="flex flex-col w-full md:max-w-[520px] px-2 lg:px-0 lg:max-w-[750px]  h-full ">
        <CategoryBar />
        <div className="flex flex-col gap-10 py-5">
          <AllBlogCards category ={category as string} />
        </div>
      </div>
      <div className="  md:flex hidden md:w-[600px] sticky w-full top-0 lg:w-[400px] border-l border-gray-300   px-5 py-10 h-[calc(100vh)]">
        <RecomendedAuthors />
      </div>
    </div>
  );
}
