"use client";

import React from 'react';
import { Clipboard,BarChart,MessageCircle,ShoppingCart} from 'lucide-react';



interface SideBarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen }) => {
   

    const navigationItems = [
    { name: 'TractorsAddingForm', icon: <Clipboard className="h-5 w-5" />, href: '/pages/AddingForm' },
    { name: 'Performance', icon: <BarChart className="h-5 w-5" />, href: '/pages/performance' },
    { name: 'Inquiries', icon: <MessageCircle className="h-5 w-5" />, href: '/pages/inquiries' },
    { name: 'SalesData', icon: <ShoppingCart className="h-5 w-5" />, href: '/pages/sales' },
    
    ];
    
   
    
    return (
        <div className={`
      fixed top-0 left-0 h-full bg-white dark:bg-gray-900 
      transition-all duration-300 ease-in-out shadow-lg
      ${isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:translate-x-0'}
      z-40
    `}>
            
            <div className='p-6'>
                <h1 className='text-2xl font-bold'> Welcome Arnold Amani</h1>
                <p className='text-sm text-gray-500 dark:text-gray-400'>Seller</p>

            </div>

             <nav className="px-4">
        {navigationItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="flex items-center gap-4 px-4 py-3 text-gray-700 dark:text-gray-200 
                     hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg mb-1 
                     transition-colors duration-200"
          >
            {item.icon}
            <span>{item.name}</span>
          </a>
        ))}
            </nav>

        </div>
    )
    
}

export default SideBar;