import Claims from "../SharedMarketing/Claims";
import BuyBox, { type BuyBoxProps } from "./BuyBox";
import Testimonials from "../SharedMarketing/Testimonials";
import type { ProductLoaderType } from "./productLoader";
import { useLoaderData } from "react-router";
const Product = () => {
  const { product, variants, selectedSellingPlan } = useLoaderData<ProductLoaderType>();
  return (
    <div>
      <BuyBox
        product={product as unknown as BuyBoxProps["product"]}
        variants={variants as unknown as BuyBoxProps["variants"]}
        selectedSellingPlan={selectedSellingPlan as BuyBoxProps["selectedSellingPlan"]}
      />
      <Claims />
      <Testimonials />
    </div>
  );
};

export default Product;
