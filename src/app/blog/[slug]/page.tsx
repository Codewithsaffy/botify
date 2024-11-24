import React, { Suspense } from "react";
import { BlogPost } from "../../../../types";
import Image from "next/image";
import FollowBtn from "@/components/buttons/FollowBtn";
import { isAuthenticated } from "@/actions/authentication";
import { format } from "date-fns";
import LikeBtn from "@/components/buttons/Like";
import Comments from "@/components/buttons/Comments";
import MarkdownRenderer from "@/components/ui/MarkDown";
import { Skeleton } from "@/components/ui/skeleton";
import CloudnaryImage from "@/components/CustomComponents/CloudnaryImage";
import Link from "next/link";

export const revalidate = 60;

const PostPageLoader = () => (
  <div className="flex flex-col gap-4 px-4 py-10 mx-auto max-w-[500px] sm:max-w-[700px]">
    <Skeleton className="w-full h-8 mb-2" />
    <Skeleton className="w-3/4 h-6 mb-3" />
    <div className="flex items-center gap-3 w-full">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex flex-col w-full">
        <Skeleton className="w-28 h-5 mb-1" />
        <Skeleton className="w-20 h-4" />
      </div>
    </div>
    <section className="flex items-center gap-6 border-y border-gray-200 py-3">
      <Skeleton className="w-20 h-7" />
      <Skeleton className="w-20 h-7" />
    </section>
    <Skeleton className="w-full h-48 mt-4" />
    <Skeleton className="w-full h-36 mt-4" />
  </div>
);

const Blog = async ({ params }: { params: { slug: string } }) => {
  const auth = await isAuthenticated();
  const userId = auth?.user?._id?.toString();

  const fetchData = await fetch(
    `${process.env.BASE_URL}/api/post/${params.slug}`,
    {
      cache: "no-cache",
    }
  );
  const data = await fetchData.json();
  const post: BlogPost = data.post;
  const date = new Date(post.createdAt);
  const publishDate = format(date, "MMM d, yyyy");

  return (
    <main className="flex flex-col gap-4 px-4 py-6 sm:py-14 mx-auto max-w-[500px] sm:max-w-[700px]">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl text-gray-900 font-bold font-lora leading-snug sm:text-4xl">
          {post.title}
        </h2>
        <h4 className="text-lg font-medium text-gray-600 font-lora leading-snug sm:text-2xl">
          {post.description}
        </h4>
      </div>
      <section className="flex items-center gap-3 w-full mt-2">
        <Image
          src={`/damyuser.avif`}
          alt="user image"
          width={40}
          height={40}
          quality={80}
          priority
          className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12"
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Link href={`/profile/${post.author.username}`} className="text-gray-900 text-sm hover:underline sm:text-base font-semibold">
              {post.author.name}
            </Link>
            <p>.</p>
            <FollowBtn
              simple={true}
              isAuthenticated={auth.isAuthenticated}
              userId={userId!}
              AuthorId={post.author._id.toString()}
            />
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <p className="text-gray-700 text-xs sm:text-sm">
              Published in <span className="font-medium">Botify</span>
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">{publishDate}</p>
          </div>
        </div>
      </section>
      <section className="flex items-center gap-6 border-y border-gray-200 py-3">
        <LikeBtn
          isAuthenticated={auth.isAuthenticated}
          likerId={userId || ""}
          postId={post._id}
          likes={post.likes}
        />
        <Comments
          initialCommentsNo={post.commentCount}
          postId={post._id}
          isAuthenticated={auth.isAuthenticated}
          commenterDetail={JSON.parse(JSON.stringify(auth.user || {}))}
        />
      </section>

      <CloudnaryImage
        src={post.image}
        alt="post image"
        width={500}
        height={500}
        quality={80}
        priority
        className="w-full h-[200px] md:h-[300px] rounded-sm"
      />
      <section className="w-full mt-4 max-w-[500px] sm:max-w-[700px] mx-auto prose prose-sm sm:prose-lg">
  {post.content ? (
    <div
      dangerouslySetInnerHTML={{ __html: post.content }}
    ></div>
  ) : (
    <MarkdownRenderer />
  )}
</section>


    </main>
  );
};

export default function PageWithSuspense({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <Suspense fallback={<PostPageLoader />}>
      <Blog params={params} />
    </Suspense>
  );
}
