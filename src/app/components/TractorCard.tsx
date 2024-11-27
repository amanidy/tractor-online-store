import Image from "next/image";

interface Tractor {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  specifications: string;
  history: string;
  images: string[];
  sellerId: number;
}

export default function TractorCard({ tractor }: { tractor: Tractor }) {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
      {tractor.images && tractor.images.length > 0 && (
        <Image
          src={tractor.images[0]}
          alt={tractor.title}
          width={300}
          height={160}
          className="w-full h-40 object-cover rounded mb-4"
        />
      )}
      <h2 className="text-lg font-bold mb-2">{tractor.title}</h2>
      <div className="flex justify-between items-center">
        <p className="text-gray-600">{tractor.location}</p>
        <p className="text-green-500 font-semibold">
          ${tractor.price.toFixed(2)}
        </p>
      </div>
      <p className="text-gray-500 mt-2 line-clamp-2">
        {tractor.description}
      </p>
    </div>
  );
}