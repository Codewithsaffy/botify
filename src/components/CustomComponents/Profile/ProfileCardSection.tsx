'use client';

import React, { useEffect, useState } from "react";
import { getProfileCard } from "@/helper/apiCall/profile";
import BlogCard from "../../cards/BlogCard";
import { AiOutlineFileText, AiOutlineInfoCircle } from "react-icons/ai";
import { FiLoader } from "react-icons/fi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { editUser } from "@/helper/apiCall/user.api";
import { useRouter } from "next/navigation";

const ProfileBottom = ({
  email,
  initialAbout,
  autherId,
  isAuthenticated,
}: {
  email: string;
  autherId: string;
  initialAbout: string;
  isAuthenticated?: boolean;
}) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("posts");
  const [about, setAbout] = useState<string>(initialAbout);
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleAddBio = async () => {
    if (!isAuthenticated) {
      router.push("/signin");
      return;
    }

    setLoading(true);
    try {
      const res = await editUser(email, { about: inputValue });
      setAbout(res?.data?.about || initialAbout);
      setInputValue("");
    } catch (error) {
      console.error("Error adding bio:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const cardData = await getProfileCard(autherId);
      setPosts(cardData?.data.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="flex flex-col gap-6 m-4">
      {/* Tabs */}
      <div className="font-bold border-b border-gray-300 text-gray-800 flex items-center gap-6">
        <h3
          onClick={() => setActiveTab("posts")}
          className={`cursor-pointer flex items-center gap-2 text-lg p-2 transition ${
            activeTab === "posts"
              ? "text-[#6A4B3C] border-b-2 border-[#6A4B3C]"
              : "text-gray-600 hover:text-[#6A4B3C]"
          }`}
        >
          <AiOutlineFileText className="text-xl" /> Posts
        </h3>
        <h3
          onClick={() => setActiveTab("about")}
          className={`cursor-pointer flex items-center gap-2 text-lg p-2 transition ${
            activeTab === "about"
              ? "text-[#6A4B3C] border-b-2 border-[#6A4B3C]"
              : "text-gray-600 hover:text-[#6A4B3C]"
          }`}
        >
          <AiOutlineInfoCircle className="text-xl" /> About
        </h3>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <FiLoader className="animate-spin text-3xl text-blue-500" />
        </div>
      ) : activeTab === "posts" ? (
        <div className="flex flex-col gap-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <BlogCard
                isAuthenticated={isAuthenticated}
                edit={true}
                key={post._id}
                cardData={post}
              />
            ))
          ) : (
            <p className="text-gray-600 text-center">No posts available.</p>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-6 p-4">
          {about ? (
            <div>
              <h3 className="text-2xl font-bold text-gray-800">About</h3>
              <p className="text-gray-700 mt-2">{about}</p>
            </div>
          ) : isAuthenticated ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="rounded-full px-6 py-2 text-white bg-blue-500 font-bold shadow-lg">
                  Add Bio
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>About</AlertDialogTitle>
                  <AlertDialogDescription>
                    Add a few details about yourself
                  </AlertDialogDescription>
                  <Textarea
                    name="about"
                    id="about"
                    value={inputValue}
                    className="w-full mt-2"
                    placeholder="Add a few details about yourself"
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction
                    className="rounded-full px-4 py-2 text-white bg-blue-500 font-bold shadow-md hover:bg-blue-600"
                    onClick={() => handleAddBio()}
                  >
                    {loading ? (
                      <FiLoader className="animate-spin text-lg" />
                    ) : (
                      "Add"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <p className="text-gray-600 text-center">
              This user hasn&apos;t added a bio yet.
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default ProfileBottom;
