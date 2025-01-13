
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
import SideBar from './(dashboard)/_components/sidebar';
import { Navbar } from './(dashboard)/_components/navbar';
import { UserProvider } from "./context/userContext";
import { ToastProvider } from './components/providers/toaster-provider';
import { ConfettiProvider } from './components/providers/confetti-provider';

export const metadata = {
  title: "AgriMarketplace",
  description: "Buy and sell second-hand tractors and agri-implements",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-gray-100 min-h-screen">

          <UserProvider>
            <ConfettiProvider />
            <ToastProvider />
            <div className="flex w-full h-screen">
              {/* Sidebar */}
              <div className="hidden md:block w-56 flex-shrink-0">
                <SideBar />
              </div>

              <div className="flex-1 w-full flex flex-col">
                {/* Navbar */}
                <div className="h-[80px] fixed inset-y-0 left-0 md:left-56 w-full md:w-[calc(100%-14rem)] z-50 bg-white shadow">
                  <Navbar />
                </div>

                {/* Main Content */}
                <div className="pt-[80px] flex-1 w-full overflow-y-auto">
                  {children}
                </div>
              </div>
            </div>
          </UserProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
