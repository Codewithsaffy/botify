import { httpAxios } from "../httpAxios";

export const getAllComments = async (postId: string) => {
  try {
    const response = await httpAxios.get(`/api/comment/${postId}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postComment = async (
  comment: string,
  commenterId: string,
  postId: string
) => {
  try {
    const response = await httpAxios.post(`/api/comment`, {
      comment,
      commenterId,
      postId,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
