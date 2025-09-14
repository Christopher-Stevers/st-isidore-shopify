import {House, Leaf, Star, Truck} from 'lucide-react';

const FarmToTableSection = ({placeholderImg}: {placeholderImg: string}) => {
  const features = [
    {
      icon: <House />,
      title: 'Straight From our Ranch',
      description:
        "Our cattle are produced on our ranch, so you can trust the source and quality of the meat you're eating enjoying locally produced, high-quality beef that's not found in grocery stores.",
    },
    {
      icon: <Leaf />,
      title: 'Pure and Natural',
      description:
        "Pure Grassfed Beef raised without hormones or antibiotics on a pesticide free farm, ensuring you're getting pure, natural meat that's good for you and the environment.",
    },
    {
      icon: <Star />,
      title: 'Exceptional Taste and Texture',
      description:
        'Our customers praise the tenderness and flavor of our beef, making it a must-try for anyone looking for a delicious and unique experience.',
    },
    {
      icon: <Truck />,
      title: 'Hassle-Free Delivery',
      description:
        'Our specialty recyclable insulated box and shipping make it easy to get the quality meat you crave, right to your door.',
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-50 rounded-2xl shadow-lg overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                <span className="block">The Farm to Table</span>
                <span className="block">Difference</span>
              </h2>
              <div className="mt-8 space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
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
