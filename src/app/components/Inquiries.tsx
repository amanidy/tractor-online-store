"use client"
import { useState, useEffect } from 'react';


interface Inquiry {
  id: number;
  tractorId: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const Inquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      setInquiries(data.inquiries);
    };
    fetchInquiries();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Inquiries</h2>
      {inquiries.length ? (
        <ul>
          {inquiries.map((inquiry) => (
            <li key={inquiry.id} className="mb-4">
              <p>
                <strong>Name:</strong> {inquiry.name}
              </p>
              <p>
                <strong>Email:</strong> {inquiry.email}
              </p>
              <p>
                <strong>Message:</strong> {inquiry.message}
              </p>
              <p>
                <strong>Date:</strong>{' '}
                {new Date(inquiry.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No inquiries available.</p>
      )}
    </div>
  );
};

export default Inquiries;

