


import "./globals.css";
import Link from "next/link";
import { UserProvider } from "./context/userContext"; 
export const metadata = {
  title: "AgriMarketplace",
  description: "Buy and sell second-hand tractors and agri-implements",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        {/* Wrap layout with UserProvider */}
        <UserProvider>
          <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-800">AgriMarketplace</h1>
              <nav className="space-x-4">
                <Link href="/" className="text-gray-700">
                  Home
                </Link>
                <Link href="/pages/tractors" className="text-gray-700">
                  Listings
                </Link>
                <Link href="/pages/About" className="text-gray-700">
                  About
                </Link>
                <Link href="/contact" className="text-gray-700">
                  Contact
                </Link>
              </nav>
              <div className="flex gap-4">
                <Link href="/pages/login" className="text-sm px-4 py-2 bg-green-500 text-white rounded">
                  Login
                </Link>
                <Link href="/pages/register" className="text-sm px-4 py-2 bg-green-500 text-white rounded">
                  Register
                </Link>
              </div>
            </div>
          </header>
          <main className="mt-8">{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
