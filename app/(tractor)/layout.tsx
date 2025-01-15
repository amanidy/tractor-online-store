import { ClerkProvider } from '@clerk/nextjs';
import "../globals.css";
import { ToastProvider } from '../components/providers/toaster-provider';
import { ConfettiProvider } from '../components/providers/confetti-provider';

export default function TractorRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ConfettiProvider />
          <ToastProvider />
          <main className="h-full">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}