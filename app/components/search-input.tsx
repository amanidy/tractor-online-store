"use client";

import qs from "query-string";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter, usePathname } from "next/navigation";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    
    const params = new URLSearchParams(window.location.search);
    setCurrentCategoryId(params.get("categoryId"));
  }, []);

  useEffect(() => {
    const debouncedValue = value.trim();
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debouncedValue,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  }, [value, currentCategoryId, router, pathname]);

  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
        placeholder="Search for a tractor"
      />
    </div>
  );
};
