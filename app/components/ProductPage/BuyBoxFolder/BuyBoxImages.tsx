import ImageGallery from '~/components/utils/ImageGallery';

function BuyBoxImages({
  product,
}: {
  product: {
    images: {
      nodes: {
        url: string;
      }[];
    };
  };
}) {
  const productImages = [
    ...product.images.nodes.map((image: {url: string}) => image.url),
  ];

  return (
    <div className="flex-1 order-2">
      <ImageGallery images={productImages} altText="Placeholder product" />
    </div>
  );
}

export default BuyBoxImages;
