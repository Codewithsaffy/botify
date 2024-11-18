"use client";

import React, { useEffect, useState } from "react";
import { SearchResults } from "../../../../types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import { searching } from "@/helper/apiCall/search.api";
import { debounce } from "lodash"; // Optional: Use lodash debounce for cleaner code

const SearchBtn = ({ className }: { className: string }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle search with debounce
  const handleSearch = debounce(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      const res = await searching(searchQuery);
      setResults(res?.data?.results || []);
    } catch (err) {
      console.error("Error during search:", err);
      setError("Failed to fetch results. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, 300); // Delay execution by 300ms

  // Update query and trigger search
  useEffect(() => {
    handleSearch(query);
  }, [query]);

  return (
    <div className={className || ""}>
      <Dialog>
        <DialogTrigger>
          <CiSearch size={25} className="sm:hidden flex" aria-label="Search" />
          <div
            className={`justify-between items-center gap-4 px-4 w-60 py-2 rounded-full bg-gray-200 text-gray-500 hidden sm:flex`}
          >
            <CiSearch size={25} />
            Search
          </div>
        </DialogTrigger>

        <DialogContent className="sm:w-[500px] w-[300px]  max-h-[300px] p-0 overflow-y-scroll">
          <DialogHeader className="w-full bg-white px-4 pt-4 pb-2 sticky top-0 ">
            <div className="flex border-b border-gray-300 items-center justify-between gap-4 w-full">
              <CiSearch size={25} />
              <input
                placeholder="Search"
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                className="border-none w-full outline-none"
                aria-label="Search input"
              />
            </div>
          </DialogHeader>
          <DialogFooter>
            <div className="flex flex-col w-full">
              {isLoading ? (
                <div className="text-center text-sm text-gray-500 p-4">
                  Loading...
                </div>
              ) : error ? (
                <div className="text-center text-sm text-red-500 p-4">
                  {error}
                </div>
              ) : results.length === 0 ? (
                <div className="text-center text-sm text-gray-500 p-4">
                  No results found.
                </div>
              ) : (
                results.map((result) => (
                  <Link
                    key={result.type === "user" ? result.username : result.slug}
                    href={
                      result.type === "user"
                        ? `/profile/${result.username}`
                        : `/post/${result.slug}`
                    }
                    className="flex items-center justify-between gap-2 hover:bg-gray-200 py-2 px-4 rounded-lg"
                  >
                    <p className="text-sm font-medium">
                      {result.type === "user" ? result.name : result.title}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {result.type}
                    </p>
                  </Link>
                ))
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchBtn;
