"use client";
import { deleteNotification } from "@/helper/apiCall/notification";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteNotificaion = ({ notificationId }: { notificationId: string }) => {
  const router = useRouter();
  const handleDelete = async () => {
    
    try {
      const res = await deleteNotification(notificationId);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return <button onClick={()=>handleDelete()}>x</button>;
};

export default DeleteNotificaion;
