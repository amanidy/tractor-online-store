"use client";

import Image from 'next/image';
import { useState, useEffect } from "react";

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
  isApproved: boolean;
}

export default function TractorsListing() {
  const [tractors, setTractors] = useState<Tractor[]>([]);
  const [pendingTractors, setPendingTractors] = useState<Tractor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    const fetchTractors = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/tractors");
        if (!response.ok) throw new Error("Failed to fetch tractors");

        const data: Tractor[] = await response.json();
        setTractors(data.filter((tractor) => tractor.isApproved));
        setPendingTractors(data.filter((tractor) => !tractor.isApproved));
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTractors();
  }, []);

  
  const approveTractor = async (id: number) => {
    try {
      const response = await fetch(`/api/tractors/${id}`, { method: "PUT" });
      if (!response.ok) throw new Error("Failed to approve tractor");

      const updatedTractor = await response.json();
      setPendingTractors((prev) => prev.filter((tractor) => tractor.id !== id));
      setTractors((prev) => [...prev, updatedTractor]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    }
  };

  
  const removeTractor = async (id: number) => {
    try {
      const response = await fetch(`/api/tractors/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to remove tractor");

      setPendingTractors((prev) => prev.filter((tractor) => tractor.id !== id));
      setTractors((prev) => prev.filter((tractor) => tractor.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-medium text-gray-600">Loading tractors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-medium text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Tractor Listings</h1>

        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Pending Tractors</h2>
        {pendingTractors.length === 0 ? (
          <p className="text-gray-500">No tractors pending approval.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingTractors.map((tractor) => (
              <div key={tractor.id} className="bg-white p-4 shadow-md rounded-md">
                
                {tractor.images && tractor.images.length > 0 && (
                  <div className="relative w-full h-48 overflow-hidden mb-4">
                    <Image 
                      src={tractor.images[0]} 
                      alt={tractor.title} 
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-700">{tractor.title}</h3>
                <p className="text-gray-600">{tractor.description}</p>
                <div className="mt-4 flex justify-between">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                    onClick={() => approveTractor(tractor.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    onClick={() => removeTractor(tractor.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-700">Approved Tractors</h2>
        {tractors.length === 0 ? (
          <p className="text-gray-500">No approved tractors available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tractors.map((tractor) => (
              <div key={tractor.id} className="bg-white p-4 shadow-md rounded-md">
                
                {tractor.images && tractor.images.length > 0 && (
                  <div className="relative w-full h-48 overflow-hidden mb-4">
                    <Image 
                      src={tractor.images[0]} 
                      alt={tractor.title} 
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-700">{tractor.title}</h3>
                <p className="text-gray-600">{tractor.description}</p>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-4"
                  onClick={() => removeTractor(tractor.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}