import ImageGallery from '~/components/utils/ImageGallery';

function BuyBoxImages({
  product,
  className,
}: {
  product: {
    images: {
      nodes: {
        url: string;
      }[];
    };
  };
  className?: string;
}) {
  const productImages = [
    ...product.images.nodes.map((image: {url: string}) => image.url),
  ];

  return (
    <div className={`flex-1 ${className}`}>
      <ImageGallery images={productImages} altText="Placeholder product" />
    </div>
  );
}

export default BuyBoxImages;
