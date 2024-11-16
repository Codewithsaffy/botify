import { isAuthenticated } from "@/actions/authentication";
import { httpAxios } from "../httpAxios";

export const deleteNotification = async (id: string) => {
  try {
    const res = httpAxios.delete(`/api/notification/${id}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};
export const deleteAllNotification = async (id: string) => {
  try {
    const res = httpAxios.delete(`/api/user/notification/${id}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getNotification = async () => {
  try {
    const userId = (await isAuthenticated()).user?._id;
    const res = httpAxios.get(`/api/user/notification/${userId}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};
