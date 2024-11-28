"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import InquiryModal from './SendInquire';

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

interface TractorCardProps {
  tractor: Tractor;
}

const TractorCard: React.FC<TractorCardProps> = ({ tractor }) => {
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105">
      {/* Image Section */}
      {tractor.images && tractor.images.length > 0 && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image 
            src={tractor.images[0]} 
            alt={tractor.title} 
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Tractor Details */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{tractor.title}</h2>
        <p className="text-gray-600 mb-2 line-clamp-2">{tractor.description}</p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-green-600">
            ${tractor.price.toLocaleString()}
          </p>
          <button
            onClick={() => setShowInquiryModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Inquire
          </button>
        </div>
      </div>

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <InquiryModal 
          tractorId={tractor.id}
          title={tractor.title}
          onClose={() => setShowInquiryModal(false)}
        />
      )}
    </div>
  );
};

export default TractorCard;