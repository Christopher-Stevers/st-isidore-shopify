import {Image} from '@shopify/hydrogen';

const promises = [
  {
    title: 'Raised in Canada',
    description:
      'Raised by independent farmers who care about animal welfare and sustainability.',
    image:
      'https://cdn.shopify.com/s/files/1/0626/1991/0197/files/ChatGPT_Image_May_3_2025_03_25_04_PM.png?v=1746300343',
  },
  {
    title: 'All-Natural Beef',
    description:
      'No artificial ingredients, no added hormones or antibiotics . . . ever.',
    image:
      'https://cdn.shopify.com/s/files/1/0626/1991/0197/files/100-grassfed-ad.webp?v=1746299183',
  },
  {
    title: '100% Grass-Fed',
    description:
      'Our cows are fed nothing but leafy forages from the time they are weaned until harvest.',
    image:
      'https://cdn.shopify.com/s/files/1/0626/1991/0197/files/100-grassfed-ad-1.webp?v=1746299183',
  },
];
type Claim = {
  title: string;
  description: string;
  image: string;
};

const PromiseCard = ({promise}: {promise: Claim}) => {
  return (
    <div className="text-center flex flex-col items-center gap-4 sm:w-96 w-80 py-8">
      <div>
        <Image
          className="rounded"
          width={192}
          height={192}
          src={promise.image}
          alt={promise.title}
        />
      </div>
      <div className="text-2xl font-bold">{promise.title}</div>
      <div className="text-lg w-72">{promise.description}</div>
    </div>
  );
};

const Claims = () => {
  return (
    <div className="w-full flex flex-col bg-white items-center gap-4">
      <div className="flex flex-wrap flex-col sm:flex-row content-center justify-center gap-4">
        {promises.map((promise) => (
          <PromiseCard key={promise.title} promise={promise} />
        ))}
      </div>
    </div>
  );
};

export default Claims;
