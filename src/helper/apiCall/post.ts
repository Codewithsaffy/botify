import { TPost } from "../../../types";
import { httpAxios } from "../httpAxios";

export async function createPost(postData: TPost) {
  try {
    const response = await httpAxios.post(`/api/post`, postData);
    return response;
  } catch (error) {
    console.error(error);
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
    console.error(error);
  }
}

export const deletePost = async (id: string) => {
  try {
    const response = await httpAxios.delete(`/api/post/delete/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updatePost = async (_id: string, content: string) => {
  try {
    const response = await httpAxios.patch(`/api/post`, { _id, content });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getPostContent = async (id: string) => {
  try {
    const response = await httpAxios.get(`/api/post/find/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};


export const getBlog = async (slug: string) => {
  try {
    const response = await httpAxios.get(`/api/post/${slug}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};