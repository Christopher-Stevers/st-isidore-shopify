import SectionWrapper from './SectionWrapper';
import {Image} from '@shopify/hydrogen';

export interface ContentSection {
  title: string;
  body: string;
  imageUrl: string;
  imagePosition: 'left' | 'right';
  buttonText?: string;
  buttonLink?: string;
  bgColor: string;
}

const GenericContentSection = ({
  title,
  body,
  imageUrl,
  imagePosition,
  buttonText,
  buttonLink,
  bgColor,
}: ContentSection) => {
  const TextContent = () => (
    <div className="md:w-1/2  w-fit text-center md:text-left">
      <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
        {title}
      </h2>
      <p
        dangerouslySetInnerHTML={{__html: body}}
        className="text-lg px-4 text-gray-600 mb-6"
      />
      {buttonText && (
        <a
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 md:px-8 md:rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          href={buttonLink}
        >
          {buttonText}
        </a>
      )}
    </div>
  );

  const ImageContent = () => (
    <div className="md:w-1/2 w-fit">
      <Image
        src={imageUrl}
        width={400}
        height={400}
        className=" h-[400px] w-[400px] shadow-xl object-fit md:rounded-xl"
      />
    </div>
  );

  return (
    <div className={bgColor}>
      <SectionWrapper bgColor={bgColor}>
        <div
          className={`flex flex-col content-center  md:flex-row items-center gap-8 md:gap-12 `}
        >
          {imagePosition === 'left' ? (
            <>
              <ImageContent />
              <TextContent />
            </>
          ) : (
            <>
              <TextContent />
              <ImageContent />
            </>
          )}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default GenericContentSection;
