"use client"

import React, { useState, useEffect } from 'react';
import { 
  TractorIcon, 
  DollarSign, 
  AlertTriangle,
  AlertCircle
} from 'lucide-react';


const IconMap = {
  TractorIcon,
  DollarSign,
  AlertTriangle,
  AlertCircle
};

interface Activity {
  id: number;
  type: string;
  description: string;
  timestamp: string;
  icon: string;
  iconColor: string;
}

const RecentActivity: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/admin');
        
        if (!response.ok) {
          throw new Error('Failed to fetch activities');
        }
        
        const data = await response.json();
        setActivities(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Activity</h2>
        <div className="text-center text-gray-500">Loading activities...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Activity</h2>
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  // If no activities
  if (activities.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Activity</h2>
        <div className="text-center text-gray-500">No recent activities</div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => {
          
          const IconComponent = IconMap[activity.icon as keyof typeof IconMap] || AlertCircle;
          
          return (
            <div
              key={activity.id}
              className="flex items-center space-x-4 border-b pb-4 last:border-b-0"
            >
              <div className="bg-gray-100 p-3 rounded-full">
                <IconComponent className={activity.iconColor} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{activity.description}</p>
                <p className="text-sm text-gray-500">{activity.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;