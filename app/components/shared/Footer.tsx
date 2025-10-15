import React from 'react';
import {Image} from '@shopify/hydrogen';
import { Link } from 'react-router';
import Instagram from '../../components/svg/socialLogos/Instagram';
//import Discord from "~/components/svg/socialLogos/Discord";
import Facebook from '../../components/svg/socialLogos/Facebook';
//import YouTube from "~/components/svg/socialLogos/Youtube";
//import Twitter from "~/components/svg/socialLogos/Twitter";
import Social, {type SocialType} from '../Social';

type WebsiteLink = {
  name: string;
  link: string;
};

const Footer: React.FC = () => {
  const socials: SocialType[] = [
    {
      name: 'Instagram',
      link: 'https://www.instagram.com/chris.stevers/',
      SocialIcon: Instagram,
    },
    {
      name: 'Facebook',
      link: 'https://www.facebook.com/chris.stevers.10',
      SocialIcon: Facebook,
    },
  ];
  const websiteLinks: WebsiteLink[] = [
    {
      name: 'Contact',
      link: '/contact',
    },
    {
      name: 'Shop',
      link: '/collections/bundles',
    },
  ];
  return (
    <footer
      className="center grid w-full grid-cols-2 content-center items-center gap-y-8 
       gap-x-16 bg-primary-500 py-8 px-8  text-backdrop-500 
        sm:px-16 md:grid-cols-[320px_320px]
         lg:justify-center lg:px-32 xl:grid-cols-[480px_480px] xl:justify-center"
    >
      <div className="flex flex-col gap-2 self-start">
        {websiteLinks.map((link: WebsiteLink) => {
          return (
            <Link
              key={link.link}
              className="text-2xl font-semibold hover:underline"
              to={link.link}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
      <div className="flex flex-col gap-2">
        {socials.map((social: SocialType) => {
          return (
            <Social
              key={social.name}
              link={social.link}
              SocialIcon={social.SocialIcon}
              name={social.name}
            />
          );
        })}
      </div>
      <div className="col-span-2 flex flex-wrap content-center items-center justify-center gap-2 self-center sm:flex-nowrap">
        Made in Canada
        <Link to="https://arisedigital.ca" className="font-semibold underline">
          in Partnership with Arise Digital{' '}
        </Link>
      </div>
    </footer>
  );
};
export default Footer;
