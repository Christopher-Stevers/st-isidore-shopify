import type {MetaFunction} from '@shopify/remix-oxygen';
import Product from '~/components/ProductPage';
import {productLoader} from '~/components/ProductPage/productLoader';

export const loader = productLoader;
export const meta: MetaFunction<typeof productLoader> = ({data}) => {
  return [
    {title: data?.product?.title},
    {title: data?.product?.title},
    {name: 'description', content: data?.product?.description},
  ];
};

const Page = () => {
  return <Product />;
};

export default Page;
