
import { MapPin, Phone, Mail, Store, Tractor } from 'lucide-react';

// Type definitions to match Prisma schema
interface Dealer {
  id: string;
  name: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
  dealerType: 'TractorParts' | 'EquipmentSupplier' | 'Comprehensive';
  specialties: string[];
  rating: number;
  verified: boolean;
  products: DealerProduct[];
}

interface DealerProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

const DealerCard: React.FC<{ dealer: Dealer }> = ({ dealer }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      {/* Dealer Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Store className="mr-3 text-blue-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800">{dealer.name}</h2>
          {dealer.verified && (
            <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              Verified
            </span>
          )}
        </div>
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`text-xl ${
                index < Math.floor(dealer.rating) ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Dealer Contact Info */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center text-gray-600">
          <MapPin className="mr-2 text-blue-500" size={20} />
          <span>{dealer.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Phone className="mr-2 text-green-500" size={20} />
          <span>{dealer.contactPhone}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Mail className="mr-2 text-red-500" size={20} />
          <span>{dealer.contactEmail}</span>
        </div>
      </div>

      {/* Dealer Specialties */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-2">Specialties</h3>
        <div className="flex flex-wrap gap-2">
          {dealer.specialties.map((specialty) => (
            <span
              key={specialty}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      {/* Dealer Products */}
      <div className="mt-4">
        <h3 className="font-semibold text-gray-700 mb-2">Featured Products</h3>
        <div className="grid grid-cols-2 gap-2">
          {dealer.products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="bg-gray-100 p-2 rounded text-sm flex justify-between items-center"
            >
              <span>{product.name}</span>
              {product.inStock ? (
                <span className="text-green-600">✓</span>
              ) : (
                <span className="text-red-600">✗</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dealer Type */}
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center text-gray-600">
          {dealer.dealerType === 'TractorParts' && (
            <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
              Tractor Parts Dealer
            </span>
          )}
          {dealer.dealerType === 'EquipmentSupplier' && (
            <Tractor className="mr-2 text-green-500" size={20} />
          )}
          {dealer.dealerType === 'Comprehensive' && (
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
              Comprehensive Dealer
            </span>
          )}
          <span>{dealer.dealerType}</span>
        </div>
      </div>
    </div>
  );
};

export default DealerCard;
