import type { MetaFunction } from "react-router";
import Product from "~/components/ProductPage";
import { productLoader } from "~/components/ProductPage/productLoader";

export const loader = productLoader;
export const meta: MetaFunction<typeof productLoader> = ({ loaderData }) => {
  console.log(loaderData);
  return [
    { title: loaderData?.product?.title ?? "" },
    { name: "description", content: loaderData?.product?.description },
  ];
};

const Page = () => {
  return <Product />;
};

export default Page;
