import {XMarkIcon} from '@heroicons/react/24/solid';
import {useEffect, useState} from 'react';

const DismissableBanner = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false); // Added state for animation
  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('dismissed', 'true');
  };
  useEffect(() => {
    if (localStorage.getItem('dismissed')) {
      setIsDismissed(true);
    } else {
      setTimeout(() => setIsAnimated(true), 1000); // Delay animation by 1 second
    }
  }, []);
  if (isDismissed) {
    return null;
  }
  return (
    <div
      className={`bg-primary-700 z-10 text-white p-4 fixed bottom-0 w-1/2 ${
        isAnimated ? 'translate-y-0' : 'translate-y-[56px]'
      } transition-transform duration-250`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <p>Sale! Act now to get most cuts at a 15% discount! 🎉</p>
        <button onClick={handleDismiss}>
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
export default DismissableBanner;
