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
    <section className="bg-gray-50 py-12 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-2xl font-semibold mb-6 text-gray-600 text-center">
          Client Success Stories
        </h3>
        <div className="w-full overflow-hidden">
          <div className="animate-slide flex space-x-6">
            {successStories.map((story) => (
              <div
                key={story.id}
                className="flex-shrink-0 max-w-sm px-4 flex flex-col items-center"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden w-full">
                  {/* Image */}
                  <Image
                    src={story.image}
                    alt={story.name}
                    width={300}
                    height={200}
                    className="object-cover w-full"
                  />
                  {/* Content */}
                  <div className="p-4 text-center">
                    <h4 className="text-lg font-semibold mb-2">{story.title}</h4>
                    <p className="text-gray-600 mb-4">{story.description}</p>
                    <p className="text-gray-500 text-sm">- {story.name}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Duplicate stories for infinite scroll */}
            {successStories.map((story) => (
              <div
                key={`duplicate-${story.id}`}
                className="flex-shrink-0 max-w-sm px-4 flex flex-col items-center"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden w-full">
                  {/* Image */}
                  <Image
                    src={story.image}
                    alt={story.name}
                    width={300}
                    height={200}
                    className="object-cover w-full"
                  />
                  {/* Content */}
                  <div className="p-4 text-center">
                    <h4 className="text-lg font-semibold mb-2">{story.title}</h4>
                    <p className="text-gray-600 mb-4">{story.description}</p>
                    <p className="text-gray-500 text-sm">- {story.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-slide {
          animation: slide 15s linear infinite;
          display: inline-flex;
          width: max-content;
        }

        .animate-slide:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ClientSuccessStories;
