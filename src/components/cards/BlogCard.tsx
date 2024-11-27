import Image from "next/image";
import Link from "next/link";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { FaComment } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { CardData } from "../../../types";
import CloudnaryImage from "../CustomComponents/CloudnaryImage";
import PostEditOrDelete from "./PostEditOrDelete";

const BlogCard = ({ cardData, isAuthenticated, edit }: { cardData: CardData; isAuthenticated?: boolean; edit?: boolean }) => {
  return (
    <div className="flex relative flex-col gap-4 border-b-[1px] border-gray-300 py-5 px-2 sm:px-4">
      <Link
        href={`/profile/${cardData.author.username}`}
        className="flex items-center space-x-2"
      >
        <Image
          src={cardData.author.image === "" ? "/damyuser.jpeg" : cardData.author.image}
          alt="user image"
          width={32}
          height={32}
          quality={80}
          priority
          className="sm:h-8 sm:w-8 h-6 w-6 rounded-full object-cover"
        />
        <p className="hover:underline text-xs sm:text-sm text-gray-700 font-medium">
          {cardData.author.name}
        </p>
      </Link>

      <Link href={`/blog/${cardData.slug}`} className="flex flex-col gap-3">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 flex flex-col gap-1">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl sm:font-extrabold sm:tracking-normal tracking-tight leading-tight font-semibold text-gray-800 line-clamp-2">
              {cardData.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-700 line-clamp-2">
              {cardData.description}
            </p>
          </div>
          <div className="relative h-[80px] w-[120px] sm:h-[107px] sm:w-[160px]">
            <CloudnaryImage 
              src={cardData.image}
              alt="blog image"
              layout="fill"
              quality={80}
              className="rounded-md object-cover object-center -z-10"
              />
            {/* <Image
              src={}}
              alt="blog image"
              layout="fill"
              quality={80}
              className="rounded-md object-cover object-center -z-10"
            /> */}
          </div>
        </div>

        <div className="flex justify-start gap-4 text-xs sm:text-sm text-gray-500 items-center">
          <p>{formatDistanceToNow(new Date(cardData.publishDate))} ago</p>
          <div className="flex items-center gap-1">
            <AiFillLike size={14} />
            <p>{cardData.likes}</p>
          </div>
          <div className="flex items-center gap-1">
            <FaComment size={14} />
            <p>{cardData.comments}</p>
          </div>
        </div>
      </Link>
      {
    
       isAuthenticated &&  edit && <PostEditOrDelete username={cardData.author.username} isAuthenticated={isAuthenticated} postId={cardData._id.toString()}/>
      }
    </div>
  );
};

export default BlogCard;
