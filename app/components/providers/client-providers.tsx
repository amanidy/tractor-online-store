// app/components/providers/client-providers.tsx
"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { UserProvider } from "../../context/userContext";
import { ToastProvider } from "../providers/toaster-provider";
import { ConfettiProvider } from "../providers/confetti-provider";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <UserProvider>
        <ConfettiProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ConfettiProvider>
      </UserProvider>
    </ClerkProvider>
  );
}