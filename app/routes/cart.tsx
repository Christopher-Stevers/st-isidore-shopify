import {Await, type MetaFunction} from '@remix-run/react';
import {Suspense, useEffect} from 'react';
import type {CartQueryDataReturn} from '@shopify/hydrogen';
import {CartForm} from '@shopify/hydrogen';
import {json, type ActionFunctionArgs} from '@shopify/remix-oxygen';
import {CartMain} from '~/components/Cart';
import {useRootLoaderData} from '~/root';

export const meta: MetaFunction = () => {
  return [{title: `St Isidore Ranch | Cart`}];
};

export async function action({request, context}: ActionFunctionArgs) {
  const freeId = 'gid://shopify/ProductVariant/43831597137973';
  const {cart} = context;
  const cartData = await cart.get();
  const freeLine = cartData?.lines.nodes?.find(
    (line) => line.merchandise.id === freeId,
  );

  const formData = await request.formData();

  const {action, inputs} = CartForm.getFormInput(formData);

  if (!action) {
    throw new Error('No action provided');
  }

  let status = 200;
  let result: CartQueryDataReturn;
  switch (action) {
    case CartForm.ACTIONS.LinesAdd: {
      const newFreeLine = inputs.lines.find(
        (line) => line.merchandiseId === freeId,
      );
      if (newFreeLine?.quantity && freeLine?.quantity) {
        result = await cart.updateLines([]);
      } else {
        result = await cart.addLines(inputs.lines);
      }
      break;
    }
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    case CartForm.ACTIONS.DiscountCodesUpdate: {
      const formDiscountCode = inputs.discountCode;

      // User inputted discount code
      const discountCodes = (
        formDiscountCode ? [formDiscountCode] : []
      ) as string[];

      // Combine discount codes already applied on cart
      discountCodes.push(...inputs.discountCodes);

      result = await cart.updateDiscountCodes(discountCodes);
      break;
    }
    case CartForm.ACTIONS.BuyerIdentityUpdate: {
      result = await cart.updateBuyerIdentity({
        ...inputs.buyerIdentity,
      });
      break;
    }
    default:
      throw new Error(`${action} cart action is not defined`);
  }

  const cartId = result?.cart.id;
  const headers = cart.setCartId(result?.cart.id);
  const {cart: cartResult, errors} = result;

  const redirectTo = formData.get('redirectTo') ?? null;
  if (typeof redirectTo === 'string') {
    status = 303;
    headers.set('Location', redirectTo);
  }

  headers.append('Set-Cookie', await context.session.commit());

  return json(
    {
      cart: cartResult,
      errors,
      analytics: {
        cartId,
      },
    },
    {status, headers},
  );
}

export default function Cart() {
  const rootData = useRootLoaderData();
  const cartPromise = rootData.cart;
  useEffect(() => {
    const fetchData = async () => {
      console.log(await cartPromise, 'my result');
    };
    fetchData();
  }, [cartPromise]);

  return (
    <div className="cart">
      <h1>Cart</h1>
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await
          resolve={cartPromise}
          errorElement={<div>An error occurred</div>}
        >
          {(cart) => {
            return <CartMain layout="page" cart={cart} />;
          }}
        </Await>
      </Suspense>
    </div>
  );
}
