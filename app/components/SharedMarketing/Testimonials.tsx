import {Star} from 'lucide-react';

const Testimonials = () => {
  // Dummy data for the testimonials, you can replace with your actual data source
  const testimonialsData: {
    name: string;
    rating: number;
    comment: string;
    image?: string;
  }[] = [
    {
      name: 'Brendan',
      rating: 5,
      comment:
        "The beef was excellent. Has more taste than any beef I've tried in the last 20 years at least.",
    },

    {
      name: 'Dawn',
      rating: 5,
      comment: 'The kids love your ground beef!',
    },
  ];

  // Function to render the star rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
          }`}
        />,
      );
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <div>
      <div className="">
        <h2 className="text-3xl font-bold text-white text-center py-8 bg-primary-500">
          People {"Can't"} Get ENOUGH Of St. Isidore Ranch Beef!
        </h2>
        <div className="flex  flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 px-4 justify-center">
            {testimonialsData.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 text-center w-72 md:w-96 flex flex-col gap-2"
              >
                {testimonial.image && (
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-800 ">
                  {testimonial.name}
                </h3>
                <p>&quot;{testimonial.comment}&quot;</p>
                {renderStars(testimonial.rating)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
