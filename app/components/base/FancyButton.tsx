import { Link } from 'react-router';

export type ButtonProps = {
  text: string;
  link: string;
  className: string;
};

const HeroButton = ({text, link, className}: ButtonProps) => {
  return (
    <Link
      className={`flex cursor-pointer items-center justify-center font-sans font-bold ${className}`}
      to={link}
    >
      {text}
    </Link>
  );
};

export default HeroButton;
