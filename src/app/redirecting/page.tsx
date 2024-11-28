import { auth } from "@/auth";
import { postNotification } from "@/helper/apiCall/notification";
import { registerUser } from "@/helper/apiCall/user.api";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const RegisterPage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  const username = session.user.email!.split("@")[0];
  const res = await registerUser({
    name: session.user.name as string,
    email: session.user.email as string,
    image: session.user.image as string,
    username,
  });
  if (res?.data.user) {
    await postNotification(
      res?.data.user._id,
      `${res?.data.user.name} Welcome to Botify`,
      "/"
    );
    redirect("/");
  }

  return null;
};

const Loading = () => (
  <div className="flex justify-center min-h-screen items-center">
    <div className="loader"></div>
  </div>
);

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <RegisterPage />
    </Suspense>
  );
}
