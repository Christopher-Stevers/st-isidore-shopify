import React from 'react';
import Instagram from '../../components/svg/socialLogos/Instagram';
import Facebook from '../../components/svg/socialLogos/Facebook';
import Social, {type SocialType} from '../Social';

export const SocialLinks: React.FC = () => {
  const socials: SocialType[] = [
    {
      name: 'Instagram',
      link: 'https://www.instagram.com/st_isidore_ranch/',
      SocialIcon: Instagram,
    },
    {
      name: 'Facebook',
      link: 'https://www.facebook.com/profile.php?id=61552526829554',
      SocialIcon: Facebook,
    },
  ];

  return (
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
  );
};
