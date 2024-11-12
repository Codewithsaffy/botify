"use server";
import { TUser } from "../../../types";
import { httpAxios } from "../httpAxios";

export const registerUser = async (data: TUser) => {
  try {
    const response = await httpAxios.post("/api/register", data);
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
