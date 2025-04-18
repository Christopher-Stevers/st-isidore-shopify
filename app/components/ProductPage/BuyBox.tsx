import {StarIcon} from '@heroicons/react/24/solid';

const BuyBoxImages = () => {
  return (
    <div className="flex-1 min-h-full bg-gray-200 flex content-center justify-center items-center">
      Images
    </div>
  );
};
const BuyBoxTitle = () => {
  return <div className="text-4xl font-bold">Product Title</div>;
};
const BuyBoxPrice = () => {
  return <div className="text-2xl font-bold">$$$ Price</div>;
};
const BuyBoxDescription = () => {
  return (
    <div className="bg-gray-200 h-48 w-full flex justify-center items-center font-bold">
      Product Description
    </div>
  );
};
const BuyBoxCTA = () => {
  return (
    <div className="w-full flex items-center justify-center h-24 font-bold text-2xl bg-gray-200">
      Call To Action (CTA)
    </div>
  );
};

const BuyBoxSocialProof = () => {
  return (
    <div className="flex gap-2">
      <StarIcon className="fill-yellow-500" />
      <StarIcon className="fill-yellow-500" />
      <StarIcon className="fill-yellow-500" />
      <StarIcon className="fill-yellow-500" />
      <StarIcon className="fill-yellow-500" />
    </div>
  );
};
const BuyBoxBody = () => {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <BuyBoxTitle />
      <BuyBoxSocialProof />
      <BuyBoxPrice />
      <BuyBoxDescription />
      <BuyBoxCTA />
    </div>
  );
};

const BuyBox = () => {
  return (
    <div
      className="mx-auto 
    flex w-[1364px]  justify-start justify-items-stretch items-stretch
     gap-4  gap-y-16 px-8"
    >
      <BuyBoxImages />

      <BuyBoxBody />
    </div>
  );
};

export default BuyBox;
