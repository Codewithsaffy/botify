import { httpAxios } from "../httpAxios";

export async function isFollow(userId: string, authorId: string) {
  try {
    const response = await httpAxios.get(`/api/follow/${userId}/${authorId}`);
    return response;
  } catch (error) {
    console.error(error);
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
    console.error(error);
  }
}
