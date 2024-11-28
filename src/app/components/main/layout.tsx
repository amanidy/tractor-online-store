"use client";

import React, { useState } from 'react';
import "./globals.css";

import Sidebar from '../SideBar';


const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <html lang="en">
      <body className="min-h-screen bg-white dark:bg-gray-900">

        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="lg:ml-64 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
};

export default Layout;
