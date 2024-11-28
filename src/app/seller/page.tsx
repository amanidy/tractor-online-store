import React from 'react';


import RecentActivity from '../components/RecentActivity';
import SalesCard from '../components/SalesData';
import InquiriesCard from '../components/Inquiries';
import PerformanceCard from '../components/Performance';

const SellerDashboardPage: React.FC = () => {
  return (
    
      <div className="space-y-6">
        
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview of Hello Tractor Marketplace</p>
        </div>

        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <InquiriesCard />
          
              <SalesCard />

              <PerformanceCard />
          
        </div>

       
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>

          
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Quick Actions</h2>
            <div className="space-y-4">
              <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
                Add New Tractor
              </button>
              <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition">
                Review Inquiries
              </button>
              <button className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition">
                Sales Control
              </button>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default SellerDashboardPage;