import { data, type LoaderFunctionArgs } from "react-router";
import { Await, useLoaderData, Link, type MetaFunction } from "react-router";
import { Suspense } from "react";
import { Image, Money } from "@shopify/hydrogen";

import { HeaderMain } from "~/components/base/Header";

import TranslateAndFade from "~/components/shared/TranslateAndFade";
import AboutCard, { AboutCardLayout } from "~/components/AboutCard";
import cardContent from "~/components/cardContent";
import Claims from "~/components/SharedMarketing/Claims";
import GoToShop from "~/components/SharedMarketing/GoToShop";
import PopularBundles from "~/components/SharedMarketing/PopularBundles";
import OurStory from "~/components/SharedMarketing/OurStory";
import FeaturedProduct from "~/components/SharedMarketing/FeaturedProduct";
import Testimonials from "~/components/SharedMarketing/Testimonials";
import FAQ from "~/components/SharedMarketing/FAQ";
export const meta: MetaFunction = () => {
  return [{ title: "St Isidore Ranch | Home" }];
};

export default function Homepage() {
  return (
    <>
      <HeaderMain />
      <GoToShop />
      <PopularBundles />
      <Claims />
      <AboutCardLayout>
        {cardContent.map((props, index) => {
          const { title, text, link, src, btnText } = props;
          const direction = index % 2 === 0 ? "left" : "right";
          return (
            <TranslateAndFade key={title} direction={direction}>
              <AboutCard
                direction={direction}
                title={title}
                text={text}
                link={link}
                src={src}
                btnText={btnText}
              />
            </TranslateAndFade>
          );
        })}
      </AboutCardLayout>
      <OurStory />
      <FeaturedProduct />
      <Testimonials />
      <FAQ />
    </>
  );
}
