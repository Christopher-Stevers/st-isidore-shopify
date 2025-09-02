import {useState} from 'react';
import {Loader2Icon, PhoneIcon} from 'lucide-react';

import {init, send} from '@emailjs/browser';

import StyledInput from '~/components/base/StyledInput';

import {PaperAirplaneIcon} from '@heroicons/react/24/solid';
import type {MetaFunction} from '@shopify/remix-oxygen';

export const meta: MetaFunction = () => [
  {title: 'Contact us'},
  {name: 'description', content: 'Contact us page'},
];

const Index = ({
  title,
  toggleOpen,
}: {
  title?: string;
  toggleOpen?: () => void;
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const emailMe = () => {
    setIsSending(true);
    const templateParams = {
      name,
      email,
      subject: '',
      message,
    };

    init({
      publicKey: 'TGRpFqeZKFbGA6xs6',
    });
    send('service_m4c8dsf', 'template_50o5top', templateParams).finally(() => {
      setName('');
      setEmail('');
      setMessage('');
      setIsSending(false);
    });
  };
  const handleSend = () => {
    emailMe();
  };

  return (
    <div className="grow max-w-2xl mx-auto flex flex-col gap-4">
      {!toggleOpen && (
        <h3 className="text-3xl font-semibold ">{title ?? 'Contact me'}</h3>
      )}

      <div className="flex flex-col gap-4">
        We'd love to hear from you and will get back to you as soon as possible.
      </div>
      <div className="flex  gap-4 items-center">
        <PhoneIcon className="h-4 w-4" />{' '}
        <a href="tel:5197036780">519-703-6780</a>
      </div>
      <div className="grid grid-cols-2 gap-8 py-4">
        <StyledInput
          value={name}
          setValue={setName}
          title="Name"
          field="name"
        />

        <StyledInput
          value={email}
          setValue={setEmail}
          title="Email"
          field="email"
        />
        <div className="col-span-2">
          <div className="text-input pb-1 text-sm text-form">Message</div>
          <textarea
            value={message}
            className=" block h-60 w-full rounded-md border  p-3 text-sm text-form outline-none focus-visible:ring-transparent"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button
          onClick={handleSend}
          className="flex w-40 content-center items-center justify-between gap-2 rounded-lg bg-primary-700 p-4 py-2 text-lg text-white"
        >
          {isSending ? (
            <Loader2Icon className="h-6 w-6" />
          ) : (
            <>
              Send <PaperAirplaneIcon className="h-6 w-6" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Index;
