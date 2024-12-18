

// pages/about.tsx

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <div className="text-sm mb-4 text-gray-600">
          <span>Homepage</span> &gt; <span className="font-semibold">About TractorHub</span>
        </div>

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">About TractorHub</h1>

        {/* Intro Section */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Trusted Agricultural Partner</h2>
          <p className="text-gray-700 leading-relaxed">
            At TractorHub, we revolutionize agriculture by providing a modern platform for buying, selling, and managing 
            tractors and agricultural equipment. With over a decade of experience, our mission is to empower farmers and 
            businesses worldwide with reliable tools and support to achieve sustainable growth and productivity.
          </p>
          <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition">
            Download Company Brochure
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: "10+", label: "Years of Experience" },
            { value: "15+", label: "Countries Served" },
            { value: "500+", label: "Happy Clients" },
            { value: "50+", label: "Trusted Partners" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 text-center border border-gray-100"
            >
              <h3 className="text-3xl font-bold text-green-600">{stat.value}</h3>
              <p className="text-gray-700">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">TractorHub`s Story</h2>
          <p className="text-gray-700 leading-relaxed">
            Established in 2012, TractorHub began with the vision of addressing the challenges faced by farmers in accessing 
            affordable and reliable agricultural machinery. Over the years, we have grown to become a leading platform, 
            bridging the gap between sellers and buyers of tractors globally, while introducing cutting-edge features to 
            improve the agricultural ecosystem.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            To empower farmers and businesses by providing a one-stop platform for all their tractor and machinery needs, 
            enhancing productivity and sustainability in agriculture.
          </p>
        </div>

        {/* Vision Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            To create a future where farmers across the globe have access to modern tools and technologies, enabling a 
            sustainable and prosperous agricultural ecosystem.
          </p>
        </div>

        {/* Values Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Innovation", description: "Leveraging technology to transform agriculture." },
              { title: "Integrity", description: "Building trust through transparent practices." },
              { title: "Sustainability", description: "Supporting eco-friendly agricultural practices." },
              { title: "Collaboration", description: "Partnering with farmers and stakeholders to achieve common goals." },
              { title: "Excellence", description: "Delivering high-quality solutions and services." },
            ].map((value, index) => (
              <div key={index} className="bg-gray-50 p-4 border border-gray-200 rounded-md shadow-sm">
                <h3 className="font-semibold text-green-600">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Why Choose TractorHub?</h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
            <li><strong>Comprehensive Solutions:</strong> A platform that covers all your tractor needs.</li>
            <li><strong>Reliable Network:</strong> Connect with trusted sellers and buyers globally.</li>
            <li><strong>Advanced Technology:</strong> Utilize AI-driven analytics for smarter decision-making.</li>
            <li><strong>Customer-Centric:</strong> Tailored solutions to meet your unique requirements.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
