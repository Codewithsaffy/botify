// import { getAllUsers } from "@/helper/apiCall/user.api";

export default async function Home() {
  const users = await fetch("http://localhost:3000/api/register", {
    cache: "no-cache",
  });
  const data = await users.json();
  console.log(data);
  return <div>div</div>;
}
