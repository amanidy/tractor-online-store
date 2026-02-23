"use client";

import React, { ReactNode } from "react";
import ReactConfetti from "react-confetti";
import { useConfettiStore } from "../../../hooks/use-confetti-store";

interface ConfettiProviderProps {
  children: ReactNode;
}

export const ConfettiProvider = ({ children }: ConfettiProviderProps) => {
  const confetti = useConfettiStore();

  return (
    <>
      {children} 
      {confetti.isOpen && (
        <ReactConfetti
          className="pointer-events-none z-[100]"
          numberOfPieces={500}
          recycle={false}
          onConfettiComplete={() => {
            confetti.onClose();
          }}
        />
      )}
    </>
  );
};