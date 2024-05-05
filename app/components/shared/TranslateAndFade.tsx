import React, {useCallback, type ReactNode, useState} from 'react';

const TranslateAndFade = ({
  children,
  direction,
}: {
  children: ReactNode;
  direction: 'right' | 'left';
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const ref = useCallback((node: Element | null) => {
    if (!node) return;
    // eslint-disable-next-line no-global-assign
    IntersectionObserver = window.IntersectionObserver;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsIntersecting(true);
        } else {
          setIsIntersecting(false);
        }
      },
      {
        rootMargin: '400px 0px 0px 0px',
        threshold: window.innerWidth > 768 ? 0.5 : 0,
      },
    );
    observer.observe(node);
  }, []);

  return (
    <div
      ref={ref}
      className={`duration-500 ${
        isIntersecting
          ? 'translate-x-[0px] opacity-100'
          : `${
              direction === 'right'
                ? 'translate-x-[-50px]'
                : 'translate-x-[50px]'
            } opacity-0`
      }`}
    >
      {children}
    </div>
  );
};

export default TranslateAndFade;
