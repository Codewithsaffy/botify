import { httpAxios } from "../httpAxios";

export async function isFollow(userId: string, authorId: string) {
  try {
    const response = await httpAxios.get(`/api/follow/${userId}/${authorId}`);
    return response;
  } catch (error) {
    throw new Error("Failed to check follow status");
  }
}
export async function createFollowerIfNotExist(
  userId: string,
  authorId: string
) {
  try {
    const response = await httpAxios.post(`/api/follow`, { userId, authorId });
    return response;
  } catch (error) {
    throw new Error("Failed to create follower");
  }
}
