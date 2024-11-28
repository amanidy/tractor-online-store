import React from 'react';
import { 
  TractorIcon, 
  DollarSign, 
  CheckCircle, 
  AlertTriangle 
} from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import RecentActivity from '../components/RecentActivity';

const AdminDashboardPage: React.FC = () => {
  return (
    
      <div className="space-y-6">
        
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview of Hello Tractor Marketplace</p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard 
            title="Total Listings" 
            value={254} 
            trend={12.5}
            icon={<TractorIcon size={40} />} 
            bgColor="bg-blue-500"
          />
          <DashboardCard 
            title="Total Sales" 
            value="$1,245,000" 
            trend={8.3}
            icon={<DollarSign size={40} />} 
            bgColor="bg-green-500"
          />
          <DashboardCard 
            title="Pending Approvals" 
            value={42} 
            trend={-5.2}
            icon={<CheckCircle size={40} />} 
            bgColor="bg-yellow-500"
          />
          <DashboardCard 
            title="Quality Alerts" 
            value={7} 
            trend={-2.1}
            icon={<AlertTriangle size={40} />} 
            bgColor="bg-red-500"
          />
        </div>

       
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>

          
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Quick Actions</h2>
            <div className="space-y-4">
              <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
                Add New Listing
              </button>
              <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition">
                Review Transactions
              </button>
              <button className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition">
                Quality Control
              </button>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default AdminDashboardPage;