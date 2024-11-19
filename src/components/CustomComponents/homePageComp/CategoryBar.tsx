"use client";
import React, { useRef, useState, useEffect } from "react";
import { categories } from "@/lib/constants";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const CategoryBar = () => {
  const ref = useRef<HTMLUListElement>(null);
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    updateScrollButtons();
  }, []);

  const updateScrollButtons = () => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scrollCategoriesRight = () => {
    if (ref.current) {
      ref.current.scrollBy({
        left: 80,
        behavior: "smooth",
      });
      setTimeout(updateScrollButtons, 300); // Delay to allow smooth scrolling to complete
    }
  };

  const scrollCategoriesLeft = () => {
    if (ref.current) {
      ref.current.scrollBy({
        left: -80,
        behavior: "smooth",
      });
      setTimeout(updateScrollButtons, 300); // Delay to allow smooth scrolling to complete
    }
  };

  return (
    <nav className="flex  justify-between sticky top-[56px] bg-white items-center pt-6 border-b-[1px] h-[70px] border-gray-300 w-full overflow-hidden px-10">
      

      
      {/* Left Arrow */}
      <SlArrowLeft
        className={`text-xl absolute left-0  hover:cursor-pointer ${
          !canScrollLeft ? "hidden" : ""
        }`}
        onClick={canScrollLeft ? scrollCategoriesLeft : undefined}
      />

      {/* Categories List */}
      <ul
        ref={ref}
        className="flex gap-4 font-normal h-full items-center text-gray-800 overflow-hidden no-scrollbar"
      >
        {categories.map((cat) => (
          <li
            key={cat.category}
            className={`${
              currentCategory  === cat.category
                ? "text-gray-900 font-normal border-b border-gray-900"
                : "text-gray-500"
            } hover:text-gray-900 text-sm sm:text-sm transition h-full text-center flex justify-center items-center`}
          >
            <Link href={`?category=${cat.category}`}>{cat.category}</Link>
          </li>
        ))}
      </ul>

      {/* Right Arrow */}
      <SlArrowRight
        className={`text-xl absolute right-0  hover:cursor-pointer ${
          !canScrollRight ? "hidden" : ""
        }`}
        onClick={canScrollRight ? scrollCategoriesRight : undefined}
      />
      
    </nav>
  );
};

export default CategoryBar;
