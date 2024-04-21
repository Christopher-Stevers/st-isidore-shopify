import FancyButton, {type ButtonProps} from '~/components/base/FancyButton';

const HeroButton = ({text, link, className}: ButtonProps) => {
  return (
    <FancyButton
      text={text}
      link={link}
      className={`${className} h-16 w-32 text-2xl md:h-20 md:w-40 md:text-3xl lg:h-24 lg:w-60`}
    />
  );
};

export default HeroButton;
