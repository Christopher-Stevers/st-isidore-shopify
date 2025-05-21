import {Image} from '@shopify/hydrogen';
import {AboutCardLayout} from '../AboutCard';
import TranslateAndFade from '../shared/TranslateAndFade';

const GoToShop = () => {
  return (
    <div className="bg-white flex justify-center w-full">
      <div className="max-w-6xl">
        <AboutCardLayout>
          <TranslateAndFade direction="right">
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="flex flex-col justify-between gap-4 flex-1 order-1">
                <div className="flex flex-col gap-4">
                  <h3 className="text-4xl font-semibold leading-none">
                    Grass-Fed Ontario Beef.
                    <br />
                    Delivered.
                  </h3>
                  <p className="w-full font-text text-xl">
                    Regeneratively raised on the beautiful pastures of Perth
                    County and delivered to your door.
                  </p>
                </div>
                <div className="flex gap-4 w-full justify-between">
                  <a className="h-12 w-40 rounded-md bg-primary-500 hover:bg-primary-700 text-white font-bold xl:row-start-3">
                    Shop Bundles
                  </a>
                  <a className="h-12 w-40 rounded-md bg-primary-500 hover:bg-primary-700 text-white font-bold xl:row-start-3">
                    Shop Bulk
                  </a>
                </div>
              </div>
              <div className="order-2 flex-1">
                <Image
                  alt="Grass-fed beef"
                  className="relative mt-0 object-cover object-top h-[270px] w-[480px]"
                  width="480"
                  height="270"
                  crop="top"
                  src="https://cdn.shopify.com/s/files/1/0626/1991/0197/files/IMG_20240729_162846.png?v=1746534671"
                />
              </div>
            </div>
          </TranslateAndFade>
        </AboutCardLayout>
      </div>
    </div>
  );
};

export default GoToShop;
