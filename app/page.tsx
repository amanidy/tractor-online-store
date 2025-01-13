
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
