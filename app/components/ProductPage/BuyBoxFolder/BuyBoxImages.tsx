import ImageGallery from '~/components/utils/ImageGallery';

function BuyBoxImages({
  product,
  className,
}: {
  product: {
    title?: string;
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
      <ImageGallery images={productImages} altText={product.title ?? 'Product'} />
    </div>
  );
}

export default BuyBoxImages;
