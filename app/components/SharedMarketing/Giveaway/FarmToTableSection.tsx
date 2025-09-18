import {House, Leaf, Star, Truck} from 'lucide-react';

const FarmToTableSection = ({placeholderImg}: {placeholderImg: string}) => {
  const features = [
    {
      icon: <House />,
      title: 'Born & Raised on Our Land',
      description:
        "Every animal is raised right here on our Ontario ranch from birth to harvest. You know exactly where your beef comes from and how it's been cared for every step of the way.",
    },
    {
      icon: <Leaf />,
      title: '100% Grass-Fed & Finished',
      description:
        "Our cattle graze on lush, pesticide-free pastures year-round. No grain, no hormones, no antibiotics - just pure, natural grass-fed beef that's better for you and the planet.",
    },
    {
      icon: <Star />,
      title: 'Unmatched Flavor & Quality',
      description:
        "Experience the rich, complex flavors that only come from grass-fed beef. Our customers consistently tell us it's the best beef they've ever tasted - tender, juicy, and full of character.",
    },
    {
      icon: <Truck />,
      title: 'Fresh to Your Door',
      description:
        'We use premium insulated packaging and fast shipping to ensure your beef arrives frozen solid and ready for your freezer. No compromise on freshness or quality.',
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-50 rounded-2xl shadow-lg overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                <span className="block">Why Choose</span>
                <span className="block">St. Isidore Ranch?</span>
              </h2>
              <div className="mt-8 space-y-6">
                {features.map((feature) => (
                  <div key={feature.title} className="flex items-start">
                    <div className="flex-shrink-0">{feature.icon}</div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-base text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center p-8">
            <div className="w-full">
              <p className="text-center font-semibold text-gray-700 mb-4">
                Your Rancher: Chris Stevers
              </p>
              <img
                className="w-full rounded-lg shadow-xl ring-1 ring-black ring-opacity-5"
                src={placeholderImg}
                alt="Chris Stevers"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FarmToTableSection;
