import Image from 'next/image';

const FeaturedListings = () => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-2xl font-semibold mb-6 text-gray-600">Featured Listings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white shadow rounded p-4">
            <Image src="/tractor.jpg" alt="Tractor" className="w-full h-40 object-cover rounded" width={100} height={100} ></Image>
            <h4 className="text-lg font-bold mt-4 text-gray-500">Tractor X100</h4>
            <p className="text-gray-500">Location: Nairobi</p>
            <p className="text-green-600 font-bold mt-2">$15,000</p>
            <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">View Details</button>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;