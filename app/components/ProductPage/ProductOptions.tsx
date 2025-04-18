import {Link} from '@remix-run/react';
import {type VariantOption} from '@shopify/hydrogen';

function ProductOptions({option}: {option: VariantOption}) {
  return (
    <div className="product-options" key={option.name}>
      <h5>{option.name}</h5>
      <div className="product-options-grid">
        {option.values
          .filter(({isAvailable}) => isAvailable === true)
          .map(({value, isAvailable, isActive, to}) => {
            return (
              <Link
                className="product-options-item"
                key={option.name + value}
                prefetch="intent"
                preventScrollReset
                replace
                to={to}
                style={{
                  border: isActive
                    ? '1px solid black'
                    : '1px solid transparent',
                  opacity: isAvailable ? 1 : 0.3,
                }}
              >
                {value}
              </Link>
            );
          })}
      </div>
      <br />
    </div>
  );
}

export default ProductOptions;
