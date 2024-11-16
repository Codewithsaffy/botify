import { isAuthenticated } from "@/actions/authentication";
import { auth } from "@/auth";
import { registerUser } from "@/helper/apiCall/user.api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const header = headers()
  try {
    const session = await auth();
    if (!session?.user) return redirect("/signin");

    const authenticated = await isAuthenticated();
    if (authenticated) return redirect("/dashboard");

    const username = session.user.email!.split("@")[0];
    const res = await registerUser({
      name: session.user.name as string,
      email: session.user.email as string,
      image: session.user.image as string,
      username,
    });

    if (res?.data?.user) {
      return redirect("/dashboard");
    } else {
      return redirect("/signin");
    }
  } catch (error) {
    console.error("Registration error:", error);
    return redirect("/signin");
  }
};

export default Page;
