import { httpAxios } from "../httpAxios";

export async function getRecommendedAuthosr() {
  try {
    const res = await httpAxios.get(`/api/recommended/author`);
    return res;
  } catch (error) {
    throw new Error("Failed to get recommended authors");
  }
}