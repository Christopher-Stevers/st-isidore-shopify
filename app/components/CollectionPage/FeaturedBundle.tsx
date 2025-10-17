import { Link } from "react-router";

export const FeaturedBundle = ({
  featuredProduct,
}: {
  featuredProduct:
    | {
        images: {
          nodes: {
            url: string;
          }[];
        };
        title: string;
        handle: string;
      }
    | undefined
    | null;
}) => {
  if (!featuredProduct) {
    return null;
  }
  return (
    <div className="bg-backdrop-700 py-12">
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="grid grid-cols-[1fr_2fr] gap-4">
          {featuredProduct.images.nodes[0] && (
            <div className="bg-white rounded-lg shadow-md">
              <img
                src={featuredProduct.images.nodes[0].url}
                alt="Steak Cooking"
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>
          )}
          {featuredProduct.images.nodes[2] && (
            <div className="row-span-2 bg-white rounded-lg shadow-md">
              <img
                src={featuredProduct.images.nodes[2].url}
                alt="Steaks with vegetables"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
          {featuredProduct.images.nodes[1] && (
            <div className="bg-white rounded-lg shadow-md">
              <img
                src={featuredProduct.images.nodes[1].url}
                alt="Raw Steak"
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>
          )}
        </div>

        {/* Text and Button Section */}
        <div className="text-left">
          <h2 className="text-4xl  font-semibold text-primary-700 p-6">
            For a limited time:<p> {featuredProduct.title}</p>
          </h2>
          <p className="text-xl p-6">
            Say Hello to {featuredProduct.title}. Limited time offer, act fast!
          </p>
          <div className="p-6">
            <Link
              to={`/products/${featuredProduct.handle}`}
              className="bg-blue-500 rounded-md hover:bg-blue-600 text-white px-8 py-4"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
