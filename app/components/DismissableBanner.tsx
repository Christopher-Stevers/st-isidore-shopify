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
    <div className="bg-red-500 z-10 text-white p-8 fixed bottom-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <p>
          🎉We are having a sale! Due to issues in our freezing/packaging
          process we currently have meat in stock that needs to be moved as it
          is at greater risk of freezer burn long term. If you are looking for
          meat and will be eating it in the next 2 to 3 months, now is your
          chance to get some great beef at a 25% discount! 🎉
        </p>
        <button onClick={handleDismiss}>
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
export default DismissableBanner;
