// Write a component that requests a newsletter subscription and offers a giveaway
// should show up as a dialog only if the user has never subscribed before
import {Dialog} from '@headlessui/react';
import {XMarkIcon} from '@heroicons/react/24/solid';
import {useLocation} from '@remix-run/react';
import {useEffect, useRef, useState} from 'react';
const colourLogo = `https://cdn.shopify.com/s/files/1/0626/1991/0197/files/St_Isidore_Ranch_Logo_1.png?v=1715056106`;

const discountCode = 'BULK50';

const EmailGrabber: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Default to false, let useEffect handle initial opening
  const [showCode, setShowCode] = useState(false);
  // Use mock location if useLocation from '@remix-run/react' is not available or throws error

  const location = useLocation();
  //only set open first time, use local storage to track if user has subscribed
  useEffect(() => {
    const hasSubscribed = localStorage.getItem('subscribed') === 'true';

    if (location.pathname.includes('promotion')) {
      setIsOpen(false);
    } else if (!hasSubscribed) {
      setIsOpen(true);
    }
  }, [location.pathname]);

  const formRef = useRef<HTMLFormElement>(null);

  const handleCloseModal = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('subscribed', 'true');
    }
    setIsOpen(false);
  };

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    try {
      // Perform your form submission logic here, for example using fetch or an API call
      const response = await fetch('/email', {
        method: 'POST',
        body: (() => {
          const formData = new FormData(formRef.current);
          formData.append('discount', '50');
          return formData;
        })(),
      });

      if (response.ok && formRef.current) {
        // Handle successful submission
        formRef.current.reset();
        localStorage.setItem('subscribed', 'true');

        // Redirect back to the current page
      } else {
        // Handle submission errors
        // eslint-disable-next-line no-console
        console.error('Submission failed');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error during form submission:', error);
    }
    setShowCode(true);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseModal} // Use the new handler
      className="fixed inset-0 z-50 flex items-center justify-center p-4" // Increased z-index
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 pointer-events-auto"
        aria-hidden="true"
        onClick={handleCloseModal}
      />

      {/* Modal Content */}
      <Dialog.Panel className="relative flex w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-xl">
        {/* Left Column: Content & Form */}
        <div className="flex flex-col justify-center w-full p-8 space-y-6 md:w-1/2">
          {/* Logo Placeholder */}
          <div className="mx-auto">
            {/* Replace with your actual logo */}
            <img src={colourLogo} alt="Your Company Logo" className="h-16 " />
          </div>

          {showCode ? (
            <h2 className="text-3xl font-bold text-center text-gray-800">
              Your discount code is: {discountCode}
            </h2>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-center text-gray-800">
                Get 50 bucks off your next bulk beef order!
              </h2>
              <p className="text-center text-gray-600">
                Subscribe to our newsletter to get
                <span className="font-semibold">
                  {' '}
                  $50 of our 100% grass-fed bulk beef!
                </span>{' '}
                Plus, get updates on new products and special offers.
              </p>{' '}
              <form
                ref={formRef}
                method="post"
                action="/email" // This action might not be hit if JS handles it fully
                id="subscribe-form-modal"
                className="flex flex-col space-y-4"
                onSubmit={handleSubscribe}
              >
                <div>
                  <label htmlFor="email-modal" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your best email here..."
                    name="email"
                    id="email-modal"
                    required
                    className="w-full p-3 text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  // Use a color that matches the "brownish-orange" from the image, e.g., bg-orange-600
                  // Or, if your `bg-primary-500` is intended for this, you can use that.
                  className="w-full px-4 py-3 font-semibold text-white bg-amber-500 rounded-md h-12 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors duration-150"
                >
                  SUBSCRIBE
                </button>
              </form>
              <p className="text-xs text-center text-gray-500">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </>
          )}
        </div>

        {/* Right Column: Image */}
        <div className="relative hidden w-1/2 md:block">
          {/* Placeholder for the beef image. Replace with your actual image. */}
          <img
            src="https://cdn.shopify.com/s/files/1/0626/1991/0197/files/grilledBeef.webp?v=1715067070" // Adjusted placeholder
            alt="Giveaway prize - delicious beef"
            className="object-cover w-full h-full"
          />
          {/* Close Button - Positioned over the image panel */}
          <button
            onClick={handleCloseModal} // Use the new handler
            className="absolute top-4 right-4 text-gray-700 hover:text-black bg-white/70 hover:bg-white/90 rounded-full p-1 transition-colors"
            aria-label="Close dialog"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        {/* Close Button for mobile - visible when image column is hidden */}
        <button
          onClick={handleCloseModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 md:hidden bg-white/50 rounded-full p-1" // Show only on small screens
          aria-label="Close dialog"
        >
          <XMarkIcon className="w-7 h-7" />
        </button>
      </Dialog.Panel>
    </Dialog>
  );
};

export default EmailGrabber;
