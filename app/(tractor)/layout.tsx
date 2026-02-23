import { ClerkProvider } from '@clerk/nextjs';
import "../globals.css";
import { ToastProvider } from '../components/providers/toaster-provider';
import { ConfettiProvider } from '../components/providers/confetti-provider';
import { ClientProviders } from "../components/providers/client-providers";
export default function TractorRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      
          <ClientProviders>
<main className="h-full">
            {children}
          </main>
          </ClientProviders>
          
    
    </ClerkProvider>
  );
}