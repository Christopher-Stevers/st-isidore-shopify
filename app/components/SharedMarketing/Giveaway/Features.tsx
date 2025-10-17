const features = [
  {
    id: 1,
    image:
      'https://cdn.shopify.com/s/files/1/0626/1991/0197/files/363837253_151943624589207_3438170817133884433_n.jpg?v=1758203821',
    alt: 'Alfalfa',
    title: 'Pure and Natural',
    description:
      'Our beef is raised without hormones or antibiotics. They graze on our organic pastures enjoying their days in the grass, the way God intended it.',
  },
  {
    id: 2,
    image:
      'https://cdn.shopify.com/s/files/1/0626/1991/0197/files/photo_2025-06-05_11-22-26.jpg?v=1749137134',
    alt: 'Chris Stevers',
    title: 'Know the Rancher',
    description:
      "Your beef comes directly from my Ontario ranch so you can know for sure it's 100% Canadian grassfed and finished. Any Questions? Call me at 519-703-6780.",
  },
  {
    id: 3,
    image:
      'https://cdn.shopify.com/s/files/1/0626/1991/0197/files/IMG_20240729_162846.png?v=1746534671',
    alt: 'Rib eye steak',
    title: 'Fresh Ontario Beef',
    description:
      "Locally processed in Huron County and quickly vacuum sealed to lock in fresh flavour. It's truly a farm-to-table experience.",
  },
];

const Features = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.id} className="text-center">
              {/* TODO: Replace with your image */}
              <img
                src={feature.image}
                alt={feature.alt}
                className="mx-auto h-96 w-full rounded-lg object-cover shadow-lg"
              />
              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
