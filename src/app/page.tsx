
import HeroSection from '@/app/components/HeroSection';
import FeaturedListings from '@/app/components/FeaturedListing';
import FiltersSection from '@/app/components/FilterSection';
import Footer from '@/app/components/Footer';

export default function Home() {
  return (
    <main className="bg-gray-100 min-h-screen">
      <HeroSection />
      <FeaturedListings />
      <FiltersSection />
      <Footer />
    </main>
  );
}
