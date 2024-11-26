import { isAuthenticated } from "@/actions/authentication";
import { httpAxios } from "../httpAxios";


export const getNotification = async (userId: string) => {
  try {
    const res = httpAxios.get(`/api/user/notification/${userId}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};
