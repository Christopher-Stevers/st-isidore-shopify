import { Link } from 'react-router';

export type SocialType = {
  name: string;
  link: string;
  SocialIcon: React.FC<{className: string}>;
};

const Social = ({link, name, SocialIcon}: SocialType) => {
  return (
    <Link
      key={name}
      to={link}
      className="flex h-10 w-min content-center items-center gap-2 "
    >
      <SocialIcon className=" h-10 h-full fill-backdrop-500" />
    </Link>
  );
};

export default Social;
