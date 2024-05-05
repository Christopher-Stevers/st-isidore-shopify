import HeaderShared from "~/components/shared/HeaderShared";
import Footer from "~/components/shared/Footer";
import { type ReactNode } from "react";
const LayoutShared = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <>
      <HeaderShared title={title}></HeaderShared>
      <div className="min-h-[calc(100vh-340px)] pt-8 pb-48 md:pt-16 ">
        {children}
      </div>
      <Footer />
    </>
  );
};
export default LayoutShared;
