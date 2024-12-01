import { httpAxios } from "../httpAxios";

export async function getProfile(username: string) {
  try {
    const res = await httpAxios.get(`/api/profile/${username}`);
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
export async function getProfileCard(userId: string) {
  try {
    const res = await httpAxios.get(`/api/post/all-post-cards/${userId}`);
    return res;
  } catch (error: any) {
    throw new Error(error.message || "Network error occured");
  }
}
