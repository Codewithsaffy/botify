// "use server";

import { TUser } from "../../../types";
import { httpAxios } from "../httpAxios";

export const registerUser = async (data: TUser) => {
  try {
    const response = await httpAxios.post("/api/user", data);
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const getAllUsers = async () => {
  try {
    const response = await httpAxios.get("/api/register");
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const editUser = async (
  email: string,
  data: {
    name?: string;
    image?: string;
    about?: string;
    username?: string;
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
