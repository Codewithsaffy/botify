import { httpAxios } from "../httpAxios";

export const getNotification = async (userId: string) => {
  try {
    const res = httpAxios.get(`/api/user/notification/${userId}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const postNotification = async (
  userId: string,
  message: string,
  url: string
) => {
  try {
    const res = httpAxios.post(`/api/notification`, {
      userId,
      message,
      url,
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};
