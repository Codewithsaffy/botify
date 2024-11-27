// import React from "react";
// import { isAuthenticated } from "@/actions/authentication";
// import { editUser } from "@/helper/apiCall/user.api";
// import { TUser } from "../../../../../types";

// const page = ({ params }: { params: { email: string } }) => {
//   const [userDetail, setUserDetail] = React.useState<TUser | null>(null);
//   const email = params.email

//   const getUserDetail = async () => {
//     try {
//       const user = (await isAuthenticated()).user as TUser;
//       setUserDetail(user);
//     } catch (error) {
//       setUserDetail(null);
//     }
//   };
//   const handleEditUser = async () => {
//     try {
//       const edit = await editUser(email, { ...userDetail })
//       console.log(edit)
//     } catch (error) {
//       setUserDetail(null);
//     }
//   };
//   return (

//   )
// };

// export default page;

const page = () => {
  return <div>edit</div>;
};

export default page;
