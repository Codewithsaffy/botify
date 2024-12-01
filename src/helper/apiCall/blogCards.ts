import { httpAxios } from "../httpAxios";

export async function getAllBlogCards(category: string) {
  try {
    const response = await httpAxios.get(
      `/api/post/all-post-cards?category=${category}`
    );
    return response;
  } catch (error) {
    throw new Error("This category does not exist");
  }
}
