import { httpAxios } from "../httpAxios";

export const searching = async (query: string) => {
  try {
    const res = await httpAxios.post("/api/search", { query });
    return res;
  } catch (error) {
    console.error(error);
  }
};
