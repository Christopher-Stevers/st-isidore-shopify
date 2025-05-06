import {Image} from '@shopify/hydrogen';
import AboutButton from './base/FancyButton';

export type AboutCardProps = {
  direction: 'left' | 'right';
  title: string;
  src?: string;
  link?: string;
  text: string;
  btnText?: string;
};
const AboutCard = ({
  direction,
  title,
  text,
  src,
  link,
  btnText,
}: AboutCardProps) => {
  const firstCardOrder = direction === 'left' ? 'order-2' : 'order-1';
  const secondCardOrder = direction === 'left' ? 'order-1' : 'order-2';

  return (
    <div className="flex flex-col sm:flex-row gap-8">
      <div
        className={`flex flex-col gap-4 flex-1 ${firstCardOrder} ${secondCardOrder}`}
      >
        <h3 className="text-3xl font-semibold leading-none">{title}</h3>
        <p className="w-full font-text text-xl">{text} </p>
        {link && (
          <AboutButton
            text={btnText ?? 'Learn More'}
            link={link}
            className="h-12 w-40 bg-primary-500 text-white xl:row-start-3"
          />
        )}
      </div>
      <div className={`${secondCardOrder} flex-1`}>
        <Image
          alt="some cows"
          className="relative mt-0  object-cover object-top h-[270px] w-[480px]"
          width="480"
          height="270"
          crop="top"
          src={src}
        />
      </div>
    </div>
  );
};

export const AboutCardLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div
      className="flex flex-col content-center justify-center justify-items-center gap-24
   px-4 py-24 sm:px-16  md:justify-between lg:py-32 lg:px-24 bg-cover"
    >
      {children}
    </div>
  );
};

export default AboutCard;
