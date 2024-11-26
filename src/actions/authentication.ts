"use server";

import { auth, signIn, signOut } from "@/auth";
import { dbConnect } from "@/helper/dbConnection";
import { User } from "@/models/User.model";
import { TUser } from "../../types";

export async function doSocialLogin(formData: FormData) {
  const action = formData.get("action");
  const res = await signIn(action as string, {
    redirectTo: "/redirecting",
  });
}

export async function doLogout() {
  await signOut();
}

export interface IAuthencation {
  isAuthenticated: boolean;
  user?: TUser;
  message?: string;
}
export async function isAuthenticated() {
  try {
    const session = await auth();
    if (!session?.user) return { isAuthenticated: false };
    const { email } = session.user;
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      return { isAuthenticated: false };
    }
    return { isAuthenticated: true, user: user };
  } catch (error) {
    console.error(error);
    return { isAuthenticated: false, message: "Internal Server Error" };
  }
}
// revalidatePath("/register");
