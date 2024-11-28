"use client"
import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import { 
  Clipboard, BarChart, MessageCircle, ShoppingCart,Home,Menu,X
} from 'lucide-react';

const AdminLayout = ( {children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [sellerName, setSellerName] = useState('Seller');

    useEffect(() => {
    
    const storedSellerName = localStorage.getItem('sellerName');
    if (storedSellerName) {
      setSellerName(storedSellerName);
    }
  }, []);


  const menuItems = [
    { 
      icon: <Home className="w-5 h-5" />, 
      label: 'Dashboard', 
      href: '/seller' 
    },
    { 
      icon: <Clipboard className="w-5 h-5" />, 
      label: 'Add Tractor Listings', 
      href: '/pages/AddingForm' 
    },
    { 
      icon: <BarChart className="w-5 h-5" />, 
      label: 'Check Performance', 
      href: '/pages/performance' 
    },
    { 
      icon: <MessageCircle className="w-5 h-5" />, 
      label: 'Inquiries', 
      href: '/pages/inquiries' 
      },
    { 
      icon: <ShoppingCart className="w-5 h-5" />, 
      label: 'Sales Data', 
      href: '/pages/sales' 
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      
      <button 
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      
      <div className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 
        fixed 
        md:relative 
        z-40 
        w-64 
        h-full 
        bg-white 
        shadow-lg 
        transition-transform 
        duration-300 
        ease-in-out
      `}>
        <div className="p-6 border-b">
                  <h1 className="text-2xl font-bold text-gray-800">Hello {sellerName }</h1>
        </div>
        <nav className="p-4">
          {menuItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 rounded transition"
              onClick={() => setIsSidebarOpen(false)}
            >
              {item.icon}
              <span className="text-gray-700">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      
      <div 
        className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12"
        onClick={() => setIsSidebarOpen(false)}
      >
        
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;