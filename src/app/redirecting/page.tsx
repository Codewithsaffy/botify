import { auth } from "@/auth";
import { registerUser } from "@/helper/apiCall/user.api";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session?.user) return redirect("/signin");
  const username = session.user.email!.split("@")[0];
  const res = await registerUser({
    name: session.user.name as string,
    email: session.user.email as string,
    image: session.user.image as string,
    username,
  });
  return redirect("/");
};

export default Page;
