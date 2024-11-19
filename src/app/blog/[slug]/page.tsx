import React from "react";
import { CardData } from "../../../../types";
import Image from "next/image";
import FollowBtn from "@/components/buttons/FollowBtn";
import { isAuthenticated } from "@/actions/authentication";
import { format } from "date-fns";
import LikeBtn from "@/components/buttons/Like";
import Comments from "@/components/buttons/Comments";
export const revalidate = 1;
const page = async ({ params }: { params: { slug: string } }) => {
  const auth = await isAuthenticated();
  const userId = auth?.user?._id?.toString();
  const fetchData = await fetch(
    `${process.env.BASE_URL}/api/post/${params.slug}`,
    {
      cache: "no-cache",
    }
  );
  const data = await fetchData.json();
  const post: CardData = data.post;
  const date = new Date(post.createdAt as string);
  const publishDate = format(date, "MMM d, yyyy");
  console.log(post);
  return (
    <main className="flex flex-col max-w-2xl gap-10 px-2 py-10 mx-auto">
      <h2 className="text-4xl font-bold font-lora">{post.title}</h2>
      <section className="flex items-center gap-4 w-full">
        <Image
          src={`/damyuser.avif`}
          alt="user image"
          width={48}
          height={48}
          quality={80}
          priority
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <p className="text-gray-900 leading-3 font-semibold">
              {post.author.name}
            </p>
            <p>.</p>
            <FollowBtn
              simple={true}
              isAuthenticated={auth.isAuthenticated}
              userId={userId!}
              AuthorId={post.author._id!}
            />
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-gray-700 text-sm">
              Published in <span className="font-medium">Botify</span>
            </p>
            <p className="text-gray-400 text-sm tracking-tighter">
              {publishDate}
            </p>
          </div>
        </div>
      </section>
      <section className="flex items-center gap-10 border-y border-gray-300 py-4">
        <LikeBtn
          isAuthenticated={auth.isAuthenticated}
          likerId={userId}
          postId={post._id}
          likes={post.likes}
        />
        <Comments
          commentNo={post.comments}
          postId={post._id}
          isAuthenticated={auth.isAuthenticated}
        />
      </section>
    </main>
  );
};

export default page;
