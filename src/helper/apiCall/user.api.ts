// "use server";

import { TUser } from "../../../types";
import { httpAxios } from "../httpAxios";

export const registerUser = async (data: TUser) => {
  try {
    const response = await httpAxios.post("/api/user", data);
    return response;
  } catch (error) {
    throw new Error("Failed to register user");
  }
};
export const getUser = async (email: string) => {
  try {
    const response = await httpAxios.get(`/api/user/find/${email}`);
    return response;
  } catch (error) {
    throw new Error("Failed to fetch user");
  }
};

export const editUser = async (
  email: string,
  data: {
    name?: string;
    image?: string;
    about?: string;
    thumbnail?: string;
  }
) => {
  if (!email) {
    return;
  }
  try {
    const response = await httpAxios.patch("/api/user", { email, ...data });
    return response;
  } catch (error) {
    console.error(error);
  }
};
