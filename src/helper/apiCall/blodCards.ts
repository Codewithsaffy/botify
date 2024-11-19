import { httpAxios } from "../httpAxios";

interface Props {
  category?: string;
  // limit?: number;
  // page?: number;
}
export async function getAllBlogCards(category: string) {
  try {
    const response = await httpAxios.get(
      `/api/post/all-post-cards?category=${category}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}
