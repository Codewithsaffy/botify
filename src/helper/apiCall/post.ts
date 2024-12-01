import { TPost } from "../../../types";
import { httpAxios } from "../httpAxios";

export async function createPost(postData: TPost) {
  try {
    const response = await httpAxios.post(`/api/post`, postData);
    return response;
  } catch (error: any) {
    throw new Error("Failed to create post" + error.message);
  }
}
export async function checkSlug(slug: string, authorId: string) {
  try {
    const response = await httpAxios.post(`/api/post/check-slug`, {
      slug,
      authorId,
    });
    return response;
  } catch (error) {
    throw new Error("Failed to check slug");
  }
}

export const deletePost = async (id: string) => {
  try {
    const response = await httpAxios.delete(`/api/post/delete/${id}`);
    return response;
  } catch (error) {
    throw new Error("Failed to delete post");
  }
};

export const updatePost = async (_id: string, content: string) => {
  try {
    const response = await httpAxios.patch(`/api/post`, { _id, content });
    return response;
  } catch (error) {
    throw new Error("Failed to update post");
  }
};

export const getPostContent = async (id: string) => {
  try {
    const response = await httpAxios.get(`/api/post/find/${id}`);
    return response;
  } catch (error) {
    throw new Error("Failed to fetch post content");
  }
};

export const getBlog = async (slug: string) => {
  try {
    const response = await httpAxios.get(`/api/post/${slug}`);
    throw new Error("Failed to fetch blog");
    // return response;
  } catch (error) {
    throw new Error("Failed to fetch blog");
  }
};
