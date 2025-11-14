import { CartForm, type OptimisticCartLineInput } from "@shopify/hydrogen";
import clsx from "clsx";
import type { FetcherWithComponents } from "react-router";

import { Button } from "~/components/Button";

export function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick,
  className,
}: {
  className?: string;
  analytics?: unknown;
  children: React.ReactNode;
  disabled?: boolean;
  lines: Array<OptimisticCartLineInput>;
  onClick?: () => void;
}) {
  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher: FetcherWithComponents<any>) => (
        <AddToCartButtonContent
          fetcher={fetcher}
          disabled={disabled}
          className={className}
          onClick={onClick}
          analytics={analytics}
        >
          {children}
        </AddToCartButtonContent>
      )}
    </CartForm>
  );
}

function AddToCartButtonContent({
  fetcher,
  disabled,
  className,
  onClick,
  analytics,
  children,
}: {
  fetcher: FetcherWithComponents<any>;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  analytics?: unknown;
  children: React.ReactNode;
}) {
  // Cart opening is handled globally in PageLayout via useCartFetchers
  // This matches the skeleton template pattern
  const isDisabled = disabled ?? fetcher.state !== 'idle';
  const classNameWithCursor = clsx([
    className, 
    isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
  ]);
  return (
    <>
      <input
        name="analytics"
        type="hidden"
        value={JSON.stringify(analytics)}
      />
      <button
        className={classNameWithCursor}
        type="submit"
        onClick={onClick}
        disabled={isDisabled}
      >
        {children}
      </button>
    </>
  );
}
