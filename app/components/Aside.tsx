import {useLocation} from '@remix-run/react';

/**
 * A side bar component with Overlay that works without JavaScript.
 * @example
 * ```jsx
 * <Aside id="search-aside" heading="SEARCH">
 *  <input type="search" />
 *  ...
 * </Aside>
 * ```
 */
export function Aside({
  children,
  heading,
  id = 'aside',
}: {
  children?: React.ReactNode;
  heading: React.ReactNode;
  id?: string;
}) {
  const location = useLocation();
  return (
    <div aria-modal className="overlay" id={id} role="dialog">
      <button
        className="close-outside"
        onClick={() => {
          if (typeof location.pathname === 'string') {
            window.location = location.pathname as unknown as Location;
          }
        }}
      />
      <aside>
        <header>
          <h3 className="font-display text-4xl py-4">{heading}</h3>
          <CloseAside />
        </header>
        <main>{children}</main>
      </aside>
    </div>
  );
}

function CloseAside() {
  return (
    /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
    <a
      className="close"
      href=""
      onChange={() =>
        (window.location = location.pathname as unknown as Location)
      }
    >
      &times;
    </a>
  );
}
