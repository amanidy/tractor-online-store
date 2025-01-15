{/* 
import HeroSection from './components/HeroSection';
import FeaturedListings from './components/FeaturedListing';
import FiltersSection from './components/FilterSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="bg-gray-100 w-full ">
      <HeroSection />
      <FeaturedListings />
      <FiltersSection />
      
      <Footer />
    </main>
  );
}
  */}

  import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, Store } from "lucide-react";
import { FeatureCard } from "./components/features-card";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      
      <div className="relative bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your One-Stop Tractor Marketplace
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Connect with trusted sellers and find the perfect tractor for your needs
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/dashboard/buyer">
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Start Shopping
                </Button>
              </Link>
              <Link href="/seller">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Store className="mr-2 h-5 w-5" />
                  Start Selling
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              title="For Buyers"
              description="Browse a wide selection of tractors, compare prices, and find the perfect match for your needs."
              features={[
                "Verified sellers",
                "Detailed specifications",
                "Secure transactions",
                "Direct communication"
              ]}
            />
            <FeatureCard 
              title="For Sellers"
              description="Reach thousands of potential buyers and grow your business on our platform."
              features={[
                "Easy listing process",
                "Manage inventory",
                "Analytics dashboard",
                "Support team"
              ]}
            />
            <FeatureCard 
              title="Why Choose Us"
              description="We provide a secure and efficient marketplace for tractor trading."
              features={[
                "Trusted platform",
                "24/7 support",
                "Secure payments",
                "Quality assurance"
              ]}
            />
          </div>
        </div>
      </div>

     
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied users on our platform
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Join Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
