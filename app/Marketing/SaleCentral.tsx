// Write a component that requests a newsletter subscription and offers a giveaway
// should show up as a dialog only if the user has never subscribed before
import {Dialog} from '@headlessui/react';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import {Link, useLocation} from '@remix-run/react';
import {useEffect, useRef, useState} from 'react';

const SalesCentral: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleModal = (toggler: boolean) => {
    setIsOpen(toggler);
  };

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    try {
      // Perform your form submission logic here, for example using fetch or an API call
      const response = await fetch('/email', {
        method: 'POST',
        body: new FormData(formRef.current),
      });

      if (response.ok && formRef.current) {
        // Handle successful submission
        formRef.current.reset();
        localStorage.setItem('subscribed', 'true');
        toggleModal(false);

        // Redirect back to the current page
      } else {
        // Handle submission errors
        console.error('Submission failed');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-label="Subscribe to our newsletter"
        className="p-4 inset-0 fixed flex justify-center content-center items-center  z-20 "
      >
        <div className="opacity-50 bg-black inset-0 fixed pointer-events-none"></div>
        <div className="flex flex-col items-center w-[400px] h-[500px] z-30 bg-backdrop-500 gap-4 p-4 opacity-100 rounded-md">
          <button
            className="self-end"
            onClick={() => {
              localStorage.setItem('subscribed', 'true');
              setIsOpen(false);
            }}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold">Pre-Spring Sale!</h2>
          <p className="text-lg">
            We are almost out of beef from last year, so we are offering 10% off
            a couple of the cuts that we still a plenty of have in stock.
          </p>
          <p>
            <Link
              className="flex items-center gap-2 w-full hover:underline"
              to="/products/round "
            >
              Round Steak <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </p>
          <p>
            <Link
              className="flex items-center gap-2 w-full hover:underline"
              to="/products/lean-ground-beef"
            >
              Ground Beef <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </p>
          <p className="text-lg">
            Want access to our newsletter to receive exclusive sales and more?
          </p>
          <form
            ref={formRef}
            method="post"
            action="/email"
            id="subscribe-form-footer"
            className="flex flex-col space-y-4"
            onSubmit={handleSubscribe}
          >
            <input
              type="email"
              placeholder="Email address"
              name="email"
              id="email"
              required
              className="p-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              value="subscribe"
              className={`bg-primary-500 text-white font-bold rounded-md h-10 px-2

           `}
            >
              Subscribe
            </button>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default SalesCentral;
