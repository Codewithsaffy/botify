export const editUser = async (
  email: string,
  data: {
    name?: string;
    image?: string;
    about?: string;
    username?: string;
    thumbnail?: string;
  }
): Promise<any> => {
  try {
    const response = await editUser(email, data);
    if (!response.data.user) {
      return { message: "Failed to update user" };
    }
    return { user: response.data.user, message: "User updated successfully" };
  } catch (error) {
    console.log(error);
    return { message: "Failed to update user" };
  }
};
