import React from "react";
import { Link } from "react-router";

import { SocialLinks } from "../shared/SocialLinks";

type WebsiteLink = {
  name: string;
  link: string;
};

export const Footer: React.FC = () => {
  const websiteLinks: WebsiteLink[] = [
    {
      name: "Contact",
      link: "/pages/contact",
    },
    {
      name: "Shop",
      link: "/collections",
    },
  ];
  return (
    <footer
      className="center relative grid w-full grid-cols-2 content-center items-center gap-y-8 
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
      <SocialLinks />
      <div className="col-span-2 flex flex-wrap content-center items-center justify-center gap-2 self-center sm:flex-nowrap">
        Made in Canada
        <Link to="https://arisedigital.ca" className="font-semibold underline">
          in Partnership with Arise Digital{" "}
        </Link>
      </div>
    </footer>
  );
};
