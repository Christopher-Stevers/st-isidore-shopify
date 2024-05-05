import {Dispatch, SetStateAction} from 'react';

const AddressFieldInput = ({
  value,
  setValue,
  className,
  title,
  field,
}: {
  value: string;
  className?: string;
  setValue: Dispatch<SetStateAction<string>>;
  title: string;
  field: string;
}) => {
  return (
    <div className={className}>
      <label htmlFor={field} className="block text-sm text-form">
        {title}
      </label>
      <input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="block w-full rounded-md border  p-3 text-sm text-form outline-none focus-visible:ring-transparent"
        id={field}
      />
    </div>
  );
};
export default AddressFieldInput;
