import { auth } from "@/auth";
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
  console.log(res?.data.user);
  if (res?.data.user) {
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
