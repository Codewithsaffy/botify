import React, { Suspense } from "react";
import { isAuthenticated } from "@/actions/authentication";
import FollowBtn from "@/components/buttons/FollowBtn";
import ProfileBottom from "@/components/CustomComponents/Profile/ProfileCardSection";
import { getProfile } from "@/helper/apiCall/profile";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader = () => {
  return (
    <div className="flex flex-col max-w-5xl gap-6 mx-auto animate-pulse p-4">
      <Skeleton className="w-full h-40 sm:h-48 md:h-60" />
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Skeleton className="h-24 w-24 sm:h-36 sm:w-36 rounded-full" />
        <div className="flex flex-col justify-center space-y-4 w-full">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

const ProfileContent = async ({ username }: { username: string }) => {
  const data = await getProfile(username);
  const auther = data?.data[0];
  const auth = await isAuthenticated();

  return (
    <main className="flex flex-col max-w-5xl gap-6 mx-auto p-4 sm:p-6">
      <section className="relative bg-white shadow-lg rounded-lg overflow-hidden">
        <Image
          src="/damythumbnail.jpeg"
          alt="Profile Thumbnail"
          className="w-full object-cover h-40 sm:h-48 md:h-60 rounded-t-lg"
          width={1024}
          height={1024}
        />

        <div className="flex flex-col sm:flex-row gap-4 mt-4 p-4 items-center sm:items-start">
          <div className="relative flex-shrink-0">
            <Image
              src="/damyuser.avif"
              alt="User Profile"
              className="rounded-full h-24 w-24 sm:h-36 sm:w-36 object-cover border-4 border-gray-200 shadow-lg"
              width={144}
              height={144}
            />
            <span className="absolute bottom-0 right-0 bg-green-500 border-2 border-white w-6 h-6 rounded-full"></span>
          </div>
          <div className="flex flex-col p-2 space-y-2 text-center sm:text-left">
            {/* User Info */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
              {auther?.name}
            </h2>
            <div className="text-gray-500 flex flex-wrap justify-center sm:justify-start items-center gap-2">
              <p>{auther?.username}</p>
              <p>•</p>
              <p>{auther?.followerCount} followers</p>
              <p>•</p>
              <p>{auther?.postCount} posts</p>
            </div>
            <p className="text-gray-600 max-w-full sm:max-w-[700px] h-5 overflow-hidden text-ellipsis whitespace-nowrap">
              {auther?.about || "This user hasn't added a bio yet."}
            </p>
            <div className="flex justify-center sm:justify-start">
              <FollowBtn
                simple={false}
                isAuthenticated={auth.isAuthenticated}
                AuthorId={auther?._id.toString()}
                userId={auth?.user?._id?.toString() as string}
              />
            </div>
          </div>
        </div>
      </section>

      <ProfileBottom
        initialAbout={auther?.about}
        autherId={auther?._id.toString()}
        email={auther.email}
      />
    </main>
  );
};

const ProfilePage = ({ params }: { params: { username: string } }) => {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      {/* Fetch and render profile content */}
      <ProfileContent username={params.username} />
    </Suspense>
  );
};

export default ProfilePage;
