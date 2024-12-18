"use client";

import { useState } from "react";

interface SearchFilterProps {
  onSearch: (filters: {
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    location?: string;
    make?: string;
  }) => void;
  initialLocations: string[];
  initialMakes: string[];
}

export default function SearchFilter({ 
  onSearch, 
  initialLocations, 
  initialMakes 
}: SearchFilterProps) {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [location, setLocation] = useState("");
  const [make, setMake] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filters: {
      search?: string;
      minPrice?: number;
      maxPrice?: number;
      location?: string;
      make?: string;
    } = {};

    if (search.trim()) filters.search = search.trim();
    if (minPrice) filters.minPrice = parseFloat(minPrice);
    if (maxPrice) filters.maxPrice = parseFloat(maxPrice);
    if (location) filters.location = location;
    if (make) filters.make = make;

    onSearch(filters);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4"
    >
      
      <div className="col-span-2">
        <input 
          type="text" 
          placeholder="Search tractors..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      
      <select 
        value={make}
        onChange={(e) => setMake(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">All Makes</option>
        {initialMakes.map((makeName) => (
          <option key={makeName} value={makeName}>
            {makeName}
          </option>
        ))}
      </select>

      
      <select 
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">All Locations</option>
        {initialLocations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

     
      <div className="flex gap-2">
        <input 
          type="number" 
          placeholder="Min Price" 
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input 
          type="number" 
          placeholder="Max Price" 
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      
      <button 
        type="submit" 
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
        Search
      </button>
    </form>
  );
}