const SectionWrapper = ({
  children,
  bgColor,
}: {
  children: React.ReactNode;
  bgColor: string;
}) => {
  return (
    <div className={`${bgColor} max-w-7xl w-full mx-auto py-16`}>
      {children}
    </div>
  );
};

export default SectionWrapper;
