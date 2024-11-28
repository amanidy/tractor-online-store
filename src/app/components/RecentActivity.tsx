import React from 'react';
import { 
  TractorIcon, 
  DollarSign, 
  AlertTriangle 
} from 'lucide-react';



const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'New Listing',
      description: 'Mahindra Tractor 475 added by Farm Traders',
      timestamp: '2 hours ago',
      icon: <TractorIcon className="text-blue-500" />
    },
    {
      id: 2,
      type: 'Transaction',
      description: 'John Deere 6110M sold to Green Farms Ltd',
      timestamp: '4 hours ago',
      icon: <DollarSign className="text-green-500" />
    },
    {
      id: 3,
      type: 'Quality Issue',
      description: 'Potential quality concern reported for Listing #245',
      timestamp: '6 hours ago',
      icon: <AlertTriangle className="text-yellow-500" />
    }
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className="flex items-center space-x-4 border-b pb-4 last:border-b-0"
          >
            <div className="bg-gray-100 p-3 rounded-full">
              {activity.icon}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">{activity.description}</p>
              <p className="text-sm text-gray-500">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RecentActivity;