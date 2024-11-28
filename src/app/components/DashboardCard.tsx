import React from "react";

const DashboardCard: React.FC<{
  title: string, 
  value: string | number, 
  icon: React.ReactNode, 
  trend?: number,
  bgColor?: string
}> = ({ title, value, icon, trend, bgColor = 'bg-blue-500' }) => {
  const isTrendPositive = (trend || 0) >= 0;

  return (
    <div className={`${bgColor} text-white rounded-lg p-6 shadow-md`}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium opacity-75 mb-2">{title}</h3>
          <p className="text-3xl font-bold">{value}</p>
          {trend !== undefined && (
            <div className={`flex items-center text-sm mt-2 ${isTrendPositive ? 'text-green-200' : 'text-red-200'}`}>
              {isTrendPositive ? '▲' : '▼'} {Math.abs(trend)}% 
              <span className="ml-1">from last month</span>
            </div>
          )}
        </div>
        <div className="opacity-75">{icon}</div>
      </div>
    </div>
  );
    };
export default DashboardCard;