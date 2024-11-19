import { httpAxios } from "../httpAxios";

export async function isLikePost(likerId: string, postId: string) {
  try {
    const response = await httpAxios.get(`/api/like/${likerId}/${postId}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}
export async function createLikeIfNotExist(likerId: string, postId: string) {
  try {
    const response = await httpAxios.post(`/api/like`, { likerId, postId });
    return response;
  } catch (error) {
    console.error(error);
  }
}
