"use client";
import Image from "next/image";


const successStories = [
  {
    id: 1,
    name: "John Doe",
    title: "Increased Efficiency with John Deere Tractor",
    description:
      "Using the John Deere tractor, I was able to significantly reduce the time spent on plowing, which allowed me to expand my farming operations.",
    image: "/images/tractor1.jpeg", 
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "Maximized Yield with New Cultivator",
    description:
      "The new cultivator helped me prepare the soil faster and more evenly, increasing my crop yield by 20% in just one season.",
    image: "/images/tractor2.webp", 
  },
  {
    id: 3,
    name: "Samuel K.",
    title: "Better Irrigation with Modern Sprayer",
    description:
      "By incorporating a new sprayer into my irrigation system, I was able to efficiently water my crops, ensuring better growth and water conservation.",
    image: "/images/tractor3.jpeg", 
  },
  {
    id: 4,
    name: "Alice W.",
    title: "Efficient Harvesting with Massey Ferguson Combine",
    description:
      "The Massey Ferguson combine made harvesting much faster and less labor-intensive, helping me save both time and money during harvest season.",
    image: "/images/tractor5.jpeg", 
  },
];

const ClientSuccessStories = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-2xl font-semibold mb-6 text-gray-600">Client Success Stories</h3>

        <div className="relative overflow-hidden">
          <div className="flex animate-slide">
            
            {successStories.map((story) => (
              <div key={story.id} className="flex-shrink-0 w-full md:w-1/3 px-4">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <Image
                    src={story.image}
                    alt={story.name}
                    width={400}
                    height={250}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <h4 className="text-lg font-semibold mt-4">{story.title}</h4>
                  <p className="text-gray-600 mt-2">{story.description}</p>
                  <p className="text-gray-500 mt-2">- {story.name}</p>
                </div>
              </div>
            ))}

            
            {successStories.map((story) => (
              <div key={`duplicate-${story.id}`} className="flex-shrink-0 w-full md:w-1/3 px-4">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <Image
                    src={story.image}
                    alt={story.name}
                    width={400}
                    height={250}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <h4 className="text-lg font-semibold mt-4 text-gray-500">{story.title}</h4>
                  <p className="text-gray-600 mt-2">{story.description}</p>
                  <p className="text-gray-500 mt-2">- {story.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-slide {
          animation: slide 15s linear infinite;
        }

        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </section>
  );
};

export default ClientSuccessStories;
