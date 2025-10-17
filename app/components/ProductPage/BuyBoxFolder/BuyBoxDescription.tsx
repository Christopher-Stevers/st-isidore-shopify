const BuyBoxDescription = ({description}: {description: string}) => {
  return (
    <div
      className="bg-backdrop-500 p-4 w-full "
      dangerouslySetInnerHTML={{__html: description}}
    />
  );
};

export default BuyBoxDescription;
