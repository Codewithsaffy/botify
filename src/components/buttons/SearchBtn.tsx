"use client";

import React, { useEffect } from "react";
import { SearchResults } from "../../../types";
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

const SearchBtn = ({ className }: { className: string }) => {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResults>([]);
  console.log(results);
  const handleSearch = async () => {
    if (!query) {
      setResults([]);
      return;
    }

    try {
      const res = await searching(query);

      setResults(res?.data.results);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]); // Clear results on error
    }
  };

  useEffect(() => {
    handleSearch();
  }, [query]);

  return (
    <div className={className || ""}>
      <Dialog>
        <DialogTrigger>
          <CiSearch size={25} className="sm:hidden flex" />

          <div
            className={`justify-between items-center gap-4 px-4 w-60 py-2 rounded-full bg-gray-200 text-gray-500 hidden sm:flex`}
          >
            <CiSearch size={25} />
            Search
          </div>
        </DialogTrigger>
        <DialogContent className="sm:w-[500px] w-[300px] overflow-hidden  max-h-[300px] p-0 overflow-y-scroll">
          <DialogHeader className="w-full bg-white px-4 pt-4 pb-2 sticky top-0">
            <div className="flex border-b border-gray-300 items-center justify-between gap-4 w-full">
              <CiSearch size={25} />
              <input
                placeholder="Search"
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                className="border-none w-full outline-none"
              />
            </div>
          </DialogHeader>
          <DialogFooter className="">
            <div className="flex flex-col w-full">
              <div>
                {results.length === 0 ? (
                  <div className="text-center text-sm text-gray-500 p-4">
                    no results
                  </div>
                ) : (
                  results.map((result) => (
                    <Link
                      key={
                        result.type === "user" ? result.username : result.slug
                      } // Add a unique key
                      href={
                        result.type === "user"
                          ? `/profile/${result.username}`
                          : `/post/${result.slug}`
                      }
                      className="flex items-center justify-between gap-2 hover:bg-gray-200 py-2 px-4 rounded-lg"
                    >
                      {/* Optional: Uncomment Image if paths are valid */}
                      {/* <Image src={result.image} alt="profile" width={40} height={40} /> */}
                      <p>
                        {result.type === "user" ? result.name : result.title}
                      </p>
                      <p>{result.type}</p>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchBtn;
