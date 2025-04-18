import Product from '~/components/ProductPage/Product';
import {productLoader} from '~/components/ProductPage/productLoader';

export const loader = productLoader;

const Page = () => {
  return <Product />;
};

export default Page;
