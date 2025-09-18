import {useState} from 'react';
import {useNavigate} from '@remix-run/react';
import {ZapIcon} from 'lucide-react';
// Helper component for the form to avoid repetition
const GiveawayForm = ({giveAwayDate}: {giveAwayDate: Date}) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !email.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', firstName.trim());
      formData.append('email', email.trim());
      formData.append(
        'contest',
        `$400-giveaway-entry ${giveAwayDate.toLocaleDateString()}`,
      );

      const response = await fetch('/email', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Redirect to thank you page after 1 second
        setTimeout(() => {
          navigate('/pages/giveaway-thank-you');
        }, 1000);
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="mt-6 rounded-md bg-green-50 p-4 text-center">
        <p className="text-green-800 font-medium">
          🎉 You&apos;re entered! Good luck!
        </p>
        <p className="text-xs text-green-600 mt-2">
          We&apos;ll be choosing a random winner{' '}
          {giveAwayDate.toLocaleDateString()}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 text-black space-y-4">
      <div>
        <label htmlFor="firstName" className="sr-only">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="w-full rounded-md border-gray-300 p-3 text-sm shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="email" className="sr-only">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-md border-gray-300 p-3 text-sm shadow-sm"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting || !firstName.trim() || !email.trim()}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-yellow-500 px-6 py-4 text-lg font-bold text-white transition hover:bg-yellow-600  disabled:cursor-not-allowed"
      >
        <ZapIcon className="h-4 w-4" />
        {isSubmitting ? 'Entering...' : 'Enter Me To Win Now'}
      </button>
      <p className="text-center text-xs text-gray-300">
        We&apos;ll be choosing a random winner{' '}
        {giveAwayDate.toLocaleDateString()}.
      </p>
    </form>
  );
};

export default GiveawayForm;
