"use client"

import { useState, useEffect } from 'react';


interface Sale {
  id: number;
  tractorId: number;
  buyerName: string;
  price: number;
  createdAt: string;
}

const SalesData = () => {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    const fetchSales = async () => {
      const res = await fetch('/api/sales');
      const data = await res.json();
      setSales(data.sales);
    };
    fetchSales();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-500">Sales Data</h2>
      {sales.length ? (
        <ul>
          {sales.map((sale) => (
            <li key={sale.id} className="mb-4 text-gray-500">
              <p>
                <strong>Buyer Name:</strong> {sale.buyerName}
              </p>
              <p>
                <strong>Price:</strong> ${sale.price.toFixed(2)}
              </p>
              <p>
                <strong>Date:</strong> {new Date(sale.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No sales data available.</p>
      )}
    </div>
  );
};

export default SalesData;

