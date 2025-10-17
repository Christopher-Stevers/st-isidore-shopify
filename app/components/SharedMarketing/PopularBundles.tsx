import { Link } from "react-router";
import { StarIcon } from "lucide-react";
import React from "react";
import { useRootLoaderData } from "~/root";

interface BundleCardProps {
  imageUrl: string;
  title: string;
  rating: number;
  price: string;
  imageAlt?: string;
  handle: string;
}

// Individual Bundle Card Component
const BundleCard: React.FC<BundleCardProps> = ({
  imageUrl,
  title,
  rating,
  price,
  imageAlt,
  handle,
}: {
  imageUrl: string;
  title: string;
  rating: number;
  price: string;
  imageAlt?: string;
  handle: string;
}) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarIcon
          className="fill-yellow-500"
          key={i}
          fill={i <= rating ? "fill" : "none"}
        />
      );
    }
    return stars;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col items-center p-4 md:p-6 w-[300px] ">
      {/* Product Image */}
      <img
        src={imageUrl}
        alt={imageAlt || title}
        className="w-full h-48 object-cover rounded-md"
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null; // prevent infinite loop if placeholder also fails
          target.src = `https://placehold.co/300x200/f0f0f0/333333?text=Image+Not+Found`;
        }}
      />
      {/* Product Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-1 text-center h-12 flex items-center justify-center">
        {title}
      </h3>
      {/* Product Rating */}
      <div className="flex items-center mb-2">
        {renderStars()}
        <span className="ml-2 text-gray-600">{rating.toFixed(1)}</span>
      </div>
      {/* Product Price */}
      <p className="text-xl font-bold text-gray-900 mb-4">${price}</p>
      {/* Shop Now Button */}
      <Link
        to={`/products/${handle}`}
        className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-md transition duration-150 ease-in-out w-full sm:w-auto"
      >
        Shop Now
      </Link>
    </div>
  );
};

// Main App Component
function PopularBundles() {
  const {
    layout: {
      bestSellers: { nodes },
    },
  } = useRootLoaderData();
  // Sample data for the bundles

  return (
    // Main container with a light beige background, similar to the image

    <div className="mx-auto px-4 py-16 gap-16 flex flex-col items-center">
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 ">
        Popular Bundles
        {/* Optional: Icon next to title, if you have one */}
        {/* <MeatCleaverIcon /> */}
      </h2>

      {/* Bundles Grid */}
      {/* This grid will display 1 card per row on small screens, 2 on medium, and 3 on large screens */}
      <div className="flex flex-wrap gap-4 flex-col sm:flex-row content-center justify-center">
        {nodes.map((bundle) => {
          if (!bundle.featuredImage?.url) {
            return null;
          }

          return (
            <BundleCard
              key={bundle.id}
              imageUrl={bundle.featuredImage?.url}
              title={bundle.title}
              rating={5}
              price={bundle.priceRange.minVariantPrice.amount}
              imageAlt={"image of bundle"}
              handle={bundle.handle}
            />
          );
        })}
      </div>

      {/* Shop All Bundles Button */}
      <div className="text-center">
        <Link
          to="/collections"
          className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-3 px-10 rounded-lg text-lg transition duration-150 ease-in-out"
        >
          Shop All Bundles
        </Link>
      </div>
    </div>
  );
}

export default PopularBundles;
