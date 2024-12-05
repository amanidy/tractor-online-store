"use client"

import React, { useState, useEffect } from 'react';
import DealerCard from '@/app/components/DealersCard';

interface Dealer {
  id: string;
  name: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
  dealerType: 'TractorParts' | 'EquipmentSupplier' | 'Comprehensive';
  specialties: string[];
  rating: number;
  verified: boolean;
  products: DealerProduct[];
}

interface DealerProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

const DealerList: React.FC = () => {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDealers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/dealers');
        if (!response.ok) {
          throw new Error('Failed to fetch dealers');
        }
        const data = await response.json();
        setDealers(data.dealers);
      } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }  
    } finally {
        setLoading(false);
      }
    };

    fetchDealers();
  }, []);

  if (loading) return <p>Loading dealers...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {dealers.map((dealer) => (
        <DealerCard key={dealer.id} dealer={dealer} />
      ))}
    </div>
  );
};

export default DealerList;