
// app/layout.tsx
import "./globals.css";
import SideBar from "./(dashboard)/_components/sidebar";
import { Navbar } from "./(dashboard)/_components/navbar";
import { ClientProviders } from "./components/providers/client-providers";

export const metadata = {
  title: "AgriMarketplace",
  description: "Buy and sell second-hand tractors and agri-implements",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  const isTractorRoute = false;

  if (isTractorRoute) return children;

  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <ClientProviders>
          <div className="flex w-full h-screen">
            {/* Sidebar */}
            <div className="hidden md:block w-56 flex-shrink-0">
              <SideBar />
            </div>

            {/* Main Content */}
            <div className="flex-1 w-full flex flex-col">
              {/* Navbar */}
              <div className="h-[80px] fixed inset-y-0 left-0 md:left-56 w-full md:w-[calc(100%-14rem)] z-50 bg-white shadow">
                <Navbar />
              </div>

              <div className="pt-[80px] flex-1 w-full overflow-y-auto">
                {children}
              </div>
            </div>
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}