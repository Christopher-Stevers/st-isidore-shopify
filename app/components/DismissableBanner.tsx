import {XMarkIcon} from '@heroicons/react/24/solid';
import {useEffect, useState} from 'react';

const DismissableBanner = () => {
  // write a announcement banner that the user can dismiss by clicking on a button that stores its state in localStorage
  const [isDismissed, setIsDismissed] = useState(false);
  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('dismissed', 'true');
  };
  useEffect(() => {
    if (localStorage.getItem('dismissed')) {
      setIsDismissed(true);
    }
  }, []);
  if (isDismissed) {
    return null;
  }
  return (
    <div className="bg-primary-700 z-10 text-white p-4 fixed bottom-0 w-1/2">
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
