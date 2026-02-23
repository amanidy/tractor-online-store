"use client";

import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <>
      {children} 
      <Toaster />
    </>
  );
};