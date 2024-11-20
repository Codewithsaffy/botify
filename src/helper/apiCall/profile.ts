import { httpAxios } from "../httpAxios";

export async function getProfile(username: string) {
  try {
    const res = await httpAxios.get(`/api/profile/${username}`);
    return res;
  } catch (error) {
    console.log(error);
  }
}
export async function getProfileCard(userId: string) {
  try {
    const res = await httpAxios.get(`/api/post/all-post-cards/${userId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
}
