"use client"
import React, { useState, useEffect } from 'react';
import { DollarSign } from 'lucide-react';

interface Sale {
  id: number;
  tractorId: number;
  buyerName: string;
  price: number;
  createdAt: string;
}

const SalesDashboardCard: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [averagePrice, setAveragePrice] = useState<number>(0);

  useEffect(() => {
    const fetchSales = async () => {
      const res = await fetch('/api/sales');
      const data = await res.json();
      setSales(data.sales);

      // Calculate total sales and average price
      const total = data.sales.reduce((sum: number, sale: Sale) => sum + sale.price, 0);
      setTotalSales(total);
      setAveragePrice(total / data.sales.length || 0);
    };
    fetchSales();
  }, []);

  return (
    <div className="bg-blue-500 text-white rounded-lg p-6 shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium opacity-75 mb-2">Total Sales</h3>
          <p className="text-3xl font-bold">${totalSales.toLocaleString()}</p>
          <div className="text-sm mt-2 text-blue-100">
            {sales.length} Sales
            <span className="ml-2">Avg: ${averagePrice.toFixed(2)}</span>
          </div>
        </div>
        <div className="opacity-75">
          <DollarSign size={32} />
        </div>
      </div>

      {sales.length > 0 && (
        <div className="mt-4 border-t border-blue-400 pt-4">
          <h4 className="text-sm mb-2 opacity-75">Recent Sales</h4>
          {sales.slice(0, 3).map((sale) => (
            <div key={sale.id} className="text-sm mb-1 text-blue-100">
              {sale.buyerName} - ${sale.price.toFixed(2)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SalesDashboardCard;
