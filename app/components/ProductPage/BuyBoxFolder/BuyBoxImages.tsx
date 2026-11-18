import ImageGallery from '~/components/utils/ImageGallery';

function BuyBoxImages({
  product,
  className,
}: {
  product: {
    title?: string;
    handle?: string;
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
      <ImageGallery images={productImages} altText={product.title ?? 'Product'} imageFit={product.handle === 'half-pig-pork-from-certified-organic-pigs' ? 'contain' : 'cover'} />
    </div>
  );
}

export default BuyBoxImages;
