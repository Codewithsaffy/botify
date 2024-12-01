"use client";

import React, { useEffect, useState } from "react";
import UploadButton from "@/components/CustomComponents/NewPost/UploadButton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "@/components/CustomComponents/NewPost/RichTextEditor";
import { categories } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { checkSlug, createPost } from "@/helper/apiCall/post";
import { CldImage } from "next-cloudinary";
import { TPost } from "../../../../../types";
import { redirect, useRouter } from "next/navigation";

const CreatePost = ({
  params,
}: {
  params: { username: string; id: string };
}) => {
  const [step, setStep] = useState(0);
  const { toast } = useToast();
  const [image, setImage] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [postDetails, setPostDetails] = useState<TPost>({
    title: "",
    slug: "",
    category: "",
    image: "",
    description: "",
    content: "",
    authorId: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    category: "",
    description: "",
    slug: "",
  });
  const [slugMessage, setSlugMessage] = useState("");
  const [slugExists, setSlugExists] = useState(false);

  const router = useRouter();
  // Handle Title and Slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setPostDetails((prevDetails) => ({
      ...prevDetails,
      title: newTitle,
      slug: newTitle.replace(/\s+/g, "-").toLowerCase(),
    }));
    if (newTitle.length < 5 || newTitle.length > 100) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: "Title must be between 5 and 100 characters.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, title: "" }));
    }
  };

  // Slug validation with debounce
  const revalidateSlug = async () => {
    try {
      const slug = postDetails.slug;
      const res = await checkSlug(slug, params.id);
      setSlugExists(res?.data.exists);
      setSlugMessage(
        res?.data.exists
          ? "You already have a post with this slug."
          : "This slug is available."
      );
    } catch (error) {
      setSlugMessage("Failed to validate slug. Please try again.");
    }
  };

  useEffect(() => {
    revalidateSlug();
  }, [postDetails.title]);

  // Validation for Required Fields
  const validateStepOne = () => {
    let isValid = true;
    const newErrors = { title: "", category: "", description: "", slug: "" };

    if (!postDetails.title) {
      newErrors.title = "Title is required.";
      isValid = false;
    }
    if (postDetails.title.length < 5 || postDetails.title.length > 100) {
      newErrors.title = "Title must be between 5 and 100 characters.";
      isValid = false;
    }
    if (!postDetails.category) {
      newErrors.category = "Category is required.";
      isValid = false;
    }
    if (!postDetails.description) {
      newErrors.description = "Description is required.";
      isValid = false;
    }
    if (slugExists) {
      newErrors.slug = "Slug must be unique.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (step === 0 && validateStepOne()) {
      setPostDetails({
        ...postDetails,
        authorId: params.id,
        image: image as string,
      });
      setStep(1);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    if (postDetails.content.trim() === "") {
      toast({ description: "Content cannot be empty." });
      return;
    }
    try {
      const res = await createPost(postDetails);
      router.push("/");
    } catch (err) {
      throw new Error("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center sm:px-6 sm:py-8 mx-auto px-2 py-6 max-w-screen-md space-y-8 bg-white shadow-lg rounded-lg">
      {/* Progress Indicator */}
      <div className="flex justify-center gap-3">
        {[0, 1].map((index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full ${
              step === index ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>

      {/* Step 1: Basic Details */}
      {step === 0 && (
        <section className="w-full p-2 sm:p-6 space-y-6 bg-white md:bg-blue-50 rounded-lg shadow-sm border-none sm:border">
          <h2 className="text-2xl font-bold text-blue-600 text-center">
            Add Basic Details
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Title */}
              <div>
                <Label
                  htmlFor="title"
                  className="text-sm font-medium text-gray-700"
                >
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter post title"
                  value={postDetails.title}
                  onChange={handleTitleChange}
                  className="mt-2 h-10 border-gray-300 bg-white rounded-lg shadow-sm focus:ring focus:ring-blue-400"
                />
                {errors.title && (
                  <p className="text-xs text-red-500 mt-1">{errors.title}</p>
                )}
              </div>

              {/* Slug */}
              <div>
                <Label
                  htmlFor="slug"
                  className="text-sm font-medium text-gray-700"
                >
                  Slug
                </Label>
                <Input
                  id="slug"
                  value={postDetails.slug}
                  readOnly
                  className="mt-2 h-10 bg-gray-100 border border-gray-300 rounded-lg shadow-sm flex items-center px-3"
                />
                <p className="text-xs mt-1 text-gray-600">{slugMessage}</p>
                {errors.slug && (
                  <p className="text-xs text-red-500 mt-1">{errors.slug}</p>
                )}
              </div>
            </div>
            {/* Additional Fields */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Category */}
              <div>
                <Label
                  htmlFor="category"
                  className="text-sm font-medium text-gray-700"
                >
                  Category
                </Label>
                <Select
                  onValueChange={(value) =>
                    setPostDetails({ ...postDetails, category: value })
                  }
                >
                  <SelectTrigger className="mt-2 h-10 border-gray-300 bg-white rounded-lg shadow-sm focus:ring focus:ring-blue-400">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category, index) => (
                      <SelectItem key={index} value={category.category}>
                        {category.category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-xs text-red-500 mt-1">{errors.category}</p>
                )}
              </div>
              {/* Thumbnail */}
              <div>
                <Label
                  htmlFor="thumbnail"
                  className="text-sm font-medium text-gray-700"
                >
                  Thumbnail
                </Label>
                <div className="mt-2 h-10 bg-white border border-gray-300 rounded-lg flex items-center justify-between px-4 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-xs text-gray-500">
                    {image ? (
                      <CldImage
                        className="rounded-sm h-8 w-8"
                        width="35"
                        height="35"
                        src={image}
                        alt=""
                      />
                    ) : (
                      "Upload a thumbnail"
                    )}
                  </p>
                  <UploadButton setPubliId={setImage} />
                </div>
              </div>
            </div>
            {/* Description */}
            <div>
              <Label
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Description
              </Label>
              <Textarea
                id="description"
                rows={4}
                placeholder="Write a brief description"
                value={postDetails.description}
                onChange={(e) =>
                  setPostDetails({
                    ...postDetails,
                    description: e.target.value,
                  })
                }
                className="mt-2 bg-white border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-400"
              />
              {errors.description && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all shadow-md"
            >
              Next
            </button>
          </div>
        </section>
      )}

      {/* Step 2: Content */}
      {step === 1 && (
        <section className="w-full space-y-4 p-1 sm:p-6 rounded-lg shadow-lg border-none md:bg-blue-50 bg-white sm:border">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 text-center">
            Add Content
          </h2>
          {/* RichTextEditor Section */}
          <div className="w-full bg-white rounded-md shadow-none sm:shadow-sm  sm:border sm:border-gray-200 p-0 sm:p-4">
            <RichTextEditor
              value={postDetails.content}
              setValue={(value) =>
                setPostDetails({ ...postDetails, content: value })
              }
            />
          </div>
          {/* Buttons Section */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 sm:gap-6 mt-4">
            <button
              className="px-4 py-2 bg-gray-200 text-blue-700 rounded-lg hover:bg-blue-100 transition-all"
              onClick={() => setStep(0)}
            >
              Back
            </button>
            <button
              onClick={() => handleSubmit()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all"
              disabled={loading}
            >
              {loading ? "Posting..." : "post"}
            </button>
          </div>
        </section>
      )}
    </main>
  );
};

export default CreatePost;
