import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { TNotification } from "../../../types";
import { formatDistanceToNow } from "date-fns";

const NotificationBtn = async ({ userId }: { userId: string }) => {
  const res = await fetch(
    `${process.env.BASE_URL}/api/user/notification/${userId}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const { notifications } = await res.json();
  let no = notifications.length > 99 ? "99+" : notifications.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative outline-none">
        <div className="relative">
          <IoNotificationsOutline
            size={30}
            className="text-gray-700 transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute -top-1 right-0 w-[20px] h-[20px] flex justify-center items-center text-[12px] font-semibold text-white bg-red-500 rounded-full shadow-md">
            99+
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="max-h-96 max-w-[400px] overflow-y-auto p-0 shadow-xl border border-gray-200 rounded-lg bg-white">
        <DropdownMenuLabel className="text-gray-700 text-lg font-bold px-4 py-3 bg-gray-50 sticky top-0 z-10 shadow-sm">
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="divide-y divide-gray-200">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6">
              <IoNotificationsOutline
                size={40}
                className="text-gray-400 mb-2"
              />
              <p className="text-gray-500 p-4">No new notifications</p>
            </div>
          ) : (
            notifications.map((notification: TNotification) => (
              <DropdownMenuItem
                className="flex justify-between items-start gap-3 p-4 hover:bg-gray-100 transition duration-200"
                key={notification._id}
              >
                <div className="flex flex-col">
                  <Link
                    href={notification.url}
                    className="text-gray-800 font-medium hover:underline"
                  >
                    {notification.message}
                  </Link>
                  <p className="text-gray-500 text-sm">
                    {/* Format the date to show "X ago" */}
                    {notification.createdAt
                      ? formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                        })
                      : "Unknown"}
                  </p>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {/* <ClearAllNotificationBtn userId={userId} /> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBtn;
