"use client";

import { useState, useEffect } from "react";
import SearchFilter from "../../components/Search";
import TractorCard from "../../components/TractorCard";

interface Tractor {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  specifications: string;
  history: string;
  images: string[];
  sellerId: number;
}

export default function TractorsListing() {
  const [tractors, setTractors] = useState<Tractor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  const [uniqueLocations, setUniqueLocations] = useState<string[]>([]);
  const [uniqueMakes, setUniqueMakes] = useState<string[]>([]);

  
  useEffect(() => {
    const fetchTractors = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/tractors');
        
        if (!response.ok) {
          throw new Error('Failed to fetch tractors');
        }
        
        const data: Tractor[] = await response.json();
        
        setTractors(data);

        
        const locations = Array.from(
          new Set(data.map(tractor => tractor.location))
        );
        const makes = Array.from(
          new Set(data.map(tractor => tractor.title.split(' ')[0]))
        );

        setUniqueLocations(locations);
        setUniqueMakes(makes);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTractors();
  }, []);

  
  const handleSearch = async (filters: {
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    location?: string;
    make?: string;
  }) => {
    try {
      setLoading(true);
      
      
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });

      const response = await fetch(`/api/tractors?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to search tractors');
      }
      
      const data: Tractor[] = await response.json();
      setTractors(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

 
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
        <div className="text-xl text-gray-600">Loading tractors...</div>
      </div>
    );
  }

  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Tractor Listings
        </h1>

        
        <SearchFilter 
          onSearch={handleSearch}
          initialLocations={uniqueLocations}
          initialMakes={uniqueMakes}
        />

       
        <p className="mb-4 text-gray-600">
          {tractors.length} tractor{tractors.length !== 1 ? 's' : ''} found
        </p>

        
        {tractors.length === 0 ? (
          <div className="text-center text-gray-600 mt-10">
            No tractors match your search criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tractors.map((tractor) => (
              <TractorCard 
                key={tractor.id} 
                tractor={tractor} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}