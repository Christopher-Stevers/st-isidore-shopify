import {useFetcher} from 'react-router';
import {useState} from 'react';
import type {MarketingConfig} from '~/lib/marketingConfig';

interface MarketingNewsletterProps {
  readonly config: MarketingConfig['newsletter'];
}

export function MarketingNewsletter({config}: MarketingNewsletterProps) {
  const fetcher = useFetcher();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      fetcher.submit({email}, {method: 'POST', action: '/api/drip/newsletter'});
      setIsSubmitted(true);
      setEmail('');
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">✅</span>
        </div>
        <h2 className="text-3xl font-display mb-4 text-green-600">
          Thanks for joining!
        </h2>
        <p className="text-lg text-gray-700">
          You'll receive recipes and exclusive offers in your inbox.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-3xl font-display mb-4">
        {config?.title || 'Not ready to buy yet?'}
      </h2>
      <p className="text-lg text-gray-700 mb-8">
        {config?.subtitle ||
          'Join our email list for recipes and exclusive subscriber offers.'}
      </p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          type="submit"
          disabled={fetcher.state === 'submitting'}
          className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-neutral-800 transition-colors duration-200 disabled:opacity-50"
        >
          {fetcher.state === 'submitting'
            ? 'Joining...'
            : config?.ctaText || 'Join'}
        </button>
      </form>
    </div>
  );
}
