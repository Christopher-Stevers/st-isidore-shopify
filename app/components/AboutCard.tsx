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
  const colStart = direction === 'left' ? 'xl:col-start-1' : 'xl:col-start-2';

  return (
    <div className="grid-rows grid w-80 grid-rows-[209px_48px_auto_48px] gap-x-16 gap-y-4 xl:w-min xl:grid-cols-[480px_480px] xl:grid-rows-[auto_auto_48px]">
      <h3 className="text-3xl font-semibold leading-none">{title}</h3>
      <p className="w-full font-text text-xl">{text} </p>
      {link && (
        <AboutButton
          text={btnText ?? 'Learn More'}
          link={link}
          className="h-12 w-40 bg-primary-500 text-white xl:row-start-3"
        />
      )}
      <div className={`${colStart} row-start-1 xl:row-end-4`}>
        <Image
          alt="some cows"
          className="relative mt-0 h-[180px] w-[320px] object-cover object-top xl:h-[270px] xl:w-[480px]"
          width="480"
          height="270"
          crop="top"
          src={src}
        />
      </div>
    </div>
  );
};

export default AboutCard;
