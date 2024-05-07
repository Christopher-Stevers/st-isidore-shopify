import {useState} from 'react';

import {init, send} from '@emailjs/browser';

import StyledInput from '~/components/base/StyledInput';

import {PaperAirplaneIcon} from '@heroicons/react/24/solid';

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
  const emailMe = () => {
    const templateParams = {
      name,
      email,
      subject: '',
      message,
    };

    init({
      publicKey: 'MOKnvox8qYOr6OFQi',
    });
    send('service_bbf5o0p', 'template_ivcn8m9', templateParams).finally(() => {
      setName('');
      setEmail('');
      setMessage('');
    });
  };
  const handleSend = () => {
    emailMe();
  };

  return (
    <div className="grow max-w-2xl mx-auto">
      {!toggleOpen && (
        <h3 className="text-3xl font-semibold ">{title ?? 'Contact me'}</h3>
      )}
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
          Send <PaperAirplaneIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Index;
