const FiltersSection = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-2xl font-semibold mb-6 text-gray-500">Filter Listings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Price</label>
            <select className="w-full border-gray-300 rounded px-4 py-2 text-gray-500 ">
              <option>All</option>
              <option>$0 - $5,000</option>
              <option>$5,000 - $15,000</option>
              <option>$15,000+</option>
            </select>
          </div>
         
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Location</label>
            <select className="w-full border-gray-300 rounded px-4 py-2  text-gray-500">
              <option>All</option>
              <option>Nairobi</option>
              <option>Mombasa</option>
              <option>Kisumu</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Brand</label>
            <select className="w-full border-gray-300 rounded px-4 py-2  text-gray-500">
              <option>All</option>
              <option>John Deere</option>
              <option>Massey Ferguson</option>
              <option>Ford</option>
            </select>
          </div>
        </div>
        <button className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded shadow">
          Apply Filters
        </button>
      </div>
    </section>
  );
};

export default FiltersSection;
