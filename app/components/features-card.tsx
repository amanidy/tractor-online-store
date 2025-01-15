interface FeatureCardProps {
  title: string;
  description: string;
  features: string[];
}

export function FeatureCard({ title, description, features }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold mb-3 text-green-700">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-700">
            <div className="h-2 w-2 bg-green-500 rounded-full mr-2" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}