
"use client"
import React from 'react';
import { Rocket } from 'lucide-react';

const Performance: React.FC = () => {
  
  const performanceData = {
    totalListings: 15,
    inquiriesReceived: 34,
    salesMade: 10
  };

  const conversionRate = performanceData.salesMade > 0 
    ? ((performanceData.salesMade / performanceData.inquiriesReceived) * 100).toFixed(1)
    : '0';

  return (
    <div className="bg-purple-500 text-white rounded-lg p-6 shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium opacity-75 mb-2">Performance Metrics</h3>
          <p className="text-3xl font-bold">{performanceData.salesMade} Sales</p>
          <div className="text-sm mt-2 text-purple-100">
            Conversion Rate: {conversionRate}%
          </div>
        </div>
        <div className="opacity-75">
          <Rocket size={32} />
        </div>
      </div>

      <div className="mt-4 border-t border-purple-400 pt-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-sm opacity-75">Listings</div>
            <div className="text-xl font-bold">{performanceData.totalListings}</div>
          </div>
          <div>
            <div className="text-sm opacity-75">Inquiries</div>
            <div className="text-xl font-bold">{performanceData.inquiriesReceived}</div>
          </div>
          <div>
            <div className="text-sm opacity-75">Sales</div>
            <div className="text-xl font-bold">{performanceData.salesMade}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;