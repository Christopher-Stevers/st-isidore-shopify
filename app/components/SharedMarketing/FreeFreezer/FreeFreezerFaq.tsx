import SectionWrapper from '../SectionWrapper';
import {ChevronUp, ChevronDown} from 'lucide-react';
import {useState} from 'react';
interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({question, answer}: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-5 text-left text-lg font-medium text-gray-700 hover:text-green-700 focus:outline-none"
      >
        <span>{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-amber-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div
          className="pb-5 pr-4 text-gray-600"
          dangerouslySetInnerHTML={{__html: answer}}
        />
      )}
    </div>
  );
};

const FreeFreezerFaq = () => {
  const faqData: FAQItemProps[] = [
    {
      question: 'How is the beef packaged?',
      answer:
        'All our beef is professionally cut, vacuum-sealed in individual packages for long-lasting freshness, and then flash-frozen. This ensures the highest quality and makes it easy to store and thaw just what you need.',
    },
    {
      question: 'How much freezer space do I need?',
      answer:
        'A 1/2 share (approx 150 lbs) typically requires 6-8 cubic feet of freezer space. A whole share (approx 300 lbs) needs about 12-16 cubic feet. Standard chest freezers or upright freezers work well.',
    },
    {
      question: 'What if I don&apos;t like the beef?',
      answer:
        'We stand by our quality with a 100% satisfaction guarantee. If you&apos;re not completely happy with your purchase, please contact us, and we&apos;ll make it right.',
    },
    {
      question: 'How long does the beef last in the freezer?',
      answer:
        'When properly stored in its vacuum-sealed packaging, our beef can last for at least 12 months in the freezer without any loss of quality or flavor.',
    },
    {
      question: 'Can I customize my share?',
      answer:
        'While our shares are curated to provide a balanced variety of cuts, we sometimes offer options for customization or add-ons. Please <a className="text-amber-500" href="/contact">contact us</a> for specific requests.',
    },
  ];

  return (
    <SectionWrapper bgColor="bg-transparent">
      <div className="flex flex-col items-center gap-10 w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center ">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-xl w-full">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default FreeFreezerFaq;
