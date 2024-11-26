"use client"
import { useState, useEffect } from "react";
import Image from "next/image";


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

  useEffect(() => {
    const fetchTractors = async () => {
      try {
        const res = await fetch("/api/tractorsdisplay");
        
       
        if (!res.ok) {
          throw new Error('Failed to fetch tractors');
        }
        
        const data = await res.json();
        
        
        setTractors(Array.isArray(data.tractors) ? data.tractors : []);
      } catch (error) {
        console.error("Error fetching tractors:", error);
        
        setTractors([]);
      }
    };

    fetchTractors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Tractor Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tractors.map((tractor) => (
          <div key={tractor.id} className="bg-white p-4 rounded shadow">
            {tractor.images && tractor.images.length > 0 && (
              <Image 
                src={tractor.images[0]} 
                alt={tractor.title} 
                width={300} 
                height={160} 
                className="w-full h-40 object-cover rounded" 
              />
            )}
            <h2 className="text-lg font-bold mt-2">{tractor.title}</h2>
            <p className="text-gray-600">{tractor.location}</p>
            <p className="text-green-500 font-semibold">${tractor.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}