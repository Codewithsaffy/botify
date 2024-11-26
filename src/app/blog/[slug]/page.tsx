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
import { getBlog } from "@/helper/apiCall/post";

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
  let auth = null;
  let post: BlogPost | null = null;

  try {
    auth = await isAuthenticated();
  } catch (error) {
    console.error("Authentication error:", error);
  }

  try {
    const fetchData = await getBlog(params.slug);
    const data = await fetchData?.data();
    post = data?.post || null;
  } catch (error) {
    console.error("Error fetching blog post:", error);
  }

  if (!post) {
    return (
      <div className="text-center text-gray-500 py-10">
        <h2 className="text-2xl font-semibold">Post not found</h2>
        <p>Please check the URL or try again later.</p>
      </div>
    );
  }

  const userId = auth?.user?._id?.toString() || "";
  const date = new Date(post.createdAt);
  const publishDate = format(date, "MMM d, yyyy");

  return (
    <main className="flex flex-col gap-4 px-4 py-6 sm:py-14 mx-auto max-w-[500px] sm:max-w-[700px]">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl text-gray-900 font-bold font-lora leading-snug sm:text-4xl">
          {post.title}
        </h2>
        <h4 className="text-lg font-medium text-gray-600 font-lora leading-snug sm:text-2xl">
          {post.description}
        </h4>
      </div>
      <section className="flex items-center gap-3 w-full mt-2">
        <Image
          src={`/damyuser.avif`}
          alt={`${post.author?.name || "Author"}'s profile`}
          width={40}
          height={40}
          quality={80}
          priority
          className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12"
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Link
              href={`/profile/${post.author?.username}`}
              className="text-gray-900 text-sm hover:underline sm:text-base font-semibold"
            >
              {post.author?.name || "Unknown Author"}
            </Link>
            <p>.</p>
            {post.author?._id && (
              <FollowBtn
                simple={true}
                isAuthenticated={auth?.isAuthenticated || false}
                userId={userId}
                AuthorId={post.author._id.toString()}
              />
            )}
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
          isAuthenticated={auth?.isAuthenticated || false}
          likerId={userId}
          postId={post._id}
          likes={post.likes}
        />
        <Comments
          initialCommentsNo={post.commentCount}
          postId={post._id}
          isAuthenticated={auth?.isAuthenticated || false}
          commenterDetail={auth?.user ? auth.user : null}
        />
      </section>
      {post.image && (
        <CloudnaryImage
          src={post.image}
          alt={post.title}
          width={500}
          height={500}
          quality={80}
          priority
          className="w-full aspect-video rounded-sm object-cover"
        />
      )}
      <section className="w-full mt-6 max-w-[500px] sm:max-w-[700px] mx-auto prose">
        {post.content ? (
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
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
