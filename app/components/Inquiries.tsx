
"use client"
import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

interface Inquiry {
  id: number;
  tractorId: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const InquiriesDashboardCard: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [totalInquiries, setTotalInquiries] = useState<number>(0);

  useEffect(() => {
    const fetchInquiries = async () => {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      setInquiries(data.inquiries);
      setTotalInquiries(data.inquiries.length);
    };
    fetchInquiries();
  }, []);

  return (
    <div className="bg-green-500 text-white rounded-lg p-6 shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium opacity-75 mb-2">Customer Inquiries</h3>
          <p className="text-3xl font-bold">{totalInquiries}</p>
          <div className="text-sm mt-2 text-green-100">
            New Inquiries
          </div>
        </div>
        <div className="opacity-75">
          <MessageCircle size={32} />
        </div>
      </div>

      {inquiries.length > 0 && (
        <div className="mt-4 border-t border-green-400 pt-4">
          <h4 className="text-sm mb-2 opacity-75">Recent Inquiries</h4>
          {inquiries.slice(0, 3).map((inquiry) => (
            <div key={inquiry.id} className="text-sm mb-2 text-green-100">
              <div className="font-semibold">{inquiry.name}</div>
              <div className="truncate">{inquiry.message}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InquiriesDashboardCard;
