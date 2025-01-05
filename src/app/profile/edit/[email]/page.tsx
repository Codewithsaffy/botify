"use client";
import { useEffect, useState, use } from "react";
import { TUser } from "../../../../../types";
import { getUser, editUser } from "@/helper/apiCall/user.api";
import UploadButton from "@/components/CustomComponents/NewPost/UploadButton";
import CloudnaryImage from "@/components/CustomComponents/CloudnaryImage";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton"; // Ensure the Skeleton component is imported

const ProfileEditPage = (props: { params: Promise<{ email: string }> }) => {
  const params = use(props.params);
  const [user, setUser] = useState<TUser | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    about: "",
  });
  const [image, setImage] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("damythumbnail_awmazc");
  const [loading, setLoading] = useState(false);

  const email = decodeURIComponent(params.email);

  const getUserDetail = async () => {
    try {
      const res = await getUser(email);
      if (res?.data.user) {
        setUser(res.data.user);
        setFormData({
          name: res.data.user.name || "",
          about: res.data.user.about || "",
        });
        setImage(res.data.user.image || "/damyuser.jpeg");
        setThumbnail(res.data.user.thumbnail || "damythumbnail_awmazc");
      }
    } catch (error) {
      console.error("Failed to load user details.", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await editUser(email, { ...formData, image, thumbnail });
      if (res?.status === 200) {
        toast({ description: "Profile updated successfully!" });
        await getUserDetail(); // Refresh data
      } else {
        toast({ description: "Failed to update profile." });
      }
    } catch (error) {
      toast({ description: "Failed to update profile." });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  // Skeleton Loading Effect
  if (!user) {
    return (
      <div className="flex flex-col max-w-5xl gap-6 mx-auto animate-pulse p-4">
        <Skeleton className="w-full h-12 mb-6" /> {/* Title Skeleton */}
        <div className="flex items-center justify-center">
          <Skeleton className="w-28 h-28 rounded-full" /> {/* Profile Image Skeleton */}
        </div>
        <Skeleton className="w-full h-10 rounded-md" /> {/* Name Input Skeleton */}
        <Skeleton className="w-full h-16 rounded-md" /> {/* Thumbnail Skeleton */}
        <Skeleton className="w-full h-40 rounded-md" /> {/* About Skeleton */}
        <Skeleton className="h-12 w-full rounded-lg" /> {/* Save Button Skeleton */}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative w-28 h-28">
              <Image
                fill
                src={image}
                alt="Profile"
                className="rounded-full object-cover border-4 border-gray-200 w-full h-full"
              />
              <div className="absolute bottom-0 right-0">
                <UploadButton setUrl={setImage} />
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">Click to update profile image</p>
          </div>

          {/* Name Field */}
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <label
              htmlFor="name"
              className="absolute -top-2.5 left-4 bg-white px-1 text-xs text-gray-500"
            >
              Name
            </label>
          </div>

          {/* Thumbnail Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Thumbnail
            </label>
            <div className="flex items-center gap-4">
              <CloudnaryImage
                src={thumbnail}
                alt="Thumbnail"
                className="w-16 h-16 rounded object-cover"
                width={1024}
                height={1024}
              />
              <UploadButton setPubliId={setThumbnail} />
            </div>
          </div>

          {/* About Field */}
          <div>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              rows={4}
            ></textarea>
            <label htmlFor="about" className="block mt-1 text-xs text-gray-500">
              A short bio to describe yourself.
            </label>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-medium text-sm bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-600 hover:to-blue-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditPage;
