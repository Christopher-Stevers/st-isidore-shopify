import type {MetaFunction} from 'react-router';
import Product from '~/components/ProductPage';
import {productLoader} from '~/components/ProductPage/productLoader';

export const loader = productLoader;
export const meta: MetaFunction<typeof loader> = ({matches}) => {
  const data = matches.find((match) => match.id === 'routes/products.$handle')
    ?.data as Awaited<ReturnType<typeof loader>> | undefined;
  return [
    {title: data?.product?.title ?? ''},
    {name: 'description', content: data?.product?.description},
  ];
};

const Page = () => {
  return <Product />;
};

export default Page;
