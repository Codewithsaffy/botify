import { httpAxios } from "../httpAxios";

export async function getRecommendedAuthosr(userId: string) {
  if (!userId) return;
  try {
    const res = await httpAxios.get(`/api/recommended/author/${userId}`);
    return res;
  } catch (error) {
    console.error(error);
  }
}
// export async function getRecommendedPosts(userId: string) {
//   try {
//     const userId = (await isAuthenticated()).user?._id?.toString();
//     const res = await httpAxios.get(`/api/recommended/post?userId=${userId}`);
//     return res;
//   } catch (error) {
//     console.error(error);
//   }
// }
