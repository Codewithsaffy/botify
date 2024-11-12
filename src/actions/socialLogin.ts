"use server";

import { auth, signIn, signOut } from "@/auth";
import { dbConnet } from "@/helper/dbConnection";
import { User } from "@/models/User.model";

export async function doSocialLogin(formData: FormData) {
  const action = formData.get("action");
  const res = await signIn(action as string, {
    redirectTo: "/takeusername",
  });
}

export async function doLogout() {
  await signOut();
}

export async function getUserByEmail(email: string) {
  await dbConnet();
  const user = await User.findOne({
    email: email,
  });
  if (user) {
    return user;
  }
  return null;
}

export async function credentialsLogin(formData: FormData) {
  const response = await signIn("credentials", {
    email: formData.get("email"),
    password: formData.get("password"),
    redirectTo: "/dashboard",
  });
  return response;
}
