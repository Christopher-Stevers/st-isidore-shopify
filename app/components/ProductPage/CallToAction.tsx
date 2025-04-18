import {type MetaFunction, type FetcherWithComponents} from '@remix-run/react';
import {CartForm} from '@shopify/hydrogen';
import type {CartLineInput} from '@shopify/hydrogen/storefront-api-types';
import type {ProductLoaderType} from './productLoader';

export const meta: MetaFunction<ProductLoaderType> = ({data, location}) => {
  return [{title: `St Isidore Ranch | ${data?.product.title ?? ''}`}];
};

const CallToAction = ({
  analytics,
  children,
  disabled,
  lines,
  onClick,
}: {
  analytics?: unknown;
  children: React.ReactNode;
  disabled?: boolean;
  lines: CartLineInput[];
  onClick?: () => void;
}) => {
  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher: FetcherWithComponents<any>) => (
        <>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <button
            className="bg-primary-500 py-2 px-4 text-center font-semibold leading-loose w-full text-white rounded-md"
            type="submit"
            onClick={onClick}
            disabled={disabled ?? fetcher.state !== 'idle'}
          >
            {children}
          </button>
        </>
      )}
    </CartForm>
  );
};

export default CallToAction;
