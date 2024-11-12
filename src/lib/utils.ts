import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Categories = [
  "Technology",
  "Health & Wellness",
  "Travel",
  "Food & Recipes",
  "Personal Development",
  "Finance",
  "Lifestyle",
  "Education",
  "Business",
  "Entertainment",
  "Fashion",
  "Science",
  "Gaming",
  "Politics",
  "Sports",
];
