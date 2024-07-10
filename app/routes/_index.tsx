import {type MetaFunction} from '@remix-run/react';

import {HeaderMain} from '~/components/base/Header';

import TranslateAndFade from '~/components/shared/TranslateAndFade';
import AboutCard from '~/components/AboutCard';
import cardContent from '~/components/cardContent';

export const meta: MetaFunction = () => {
  return [{title: 'St Isidore Ranch | Home'}];
};

export default function Homepage() {
  return (
    <>
      <HeaderMain />
      <div className="grid content-center justify-center justify-items-center gap-24 px-4 py-24 sm:px-16 md:grid-cols-2 md:justify-between lg:py-32 lg:px-24 xl:grid-cols-1 bg-cover">
        {cardContent.map((props, index) => {
          const {title, text, link, video, src, btnText} = props;
          const direction = index % 2 === 0 ? 'left' : 'right';
          return (
            <TranslateAndFade key={index} direction={direction}>
              <AboutCard
                direction={direction}
                title={title}
                text={text}
                link={link}
                video={video}
                src={src}
                btnText={btnText}
              />
            </TranslateAndFade>
          );
        })}
      </div>
    </>
  );
}
