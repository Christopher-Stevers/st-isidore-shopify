import {Disclosure} from '@headlessui/react';
import {ChevronUpIcon} from '@heroicons/react/24/solid';

const faqs = [
  {
    question: 'What makes your beef grass-fed and why does it matter?',
    answer:
      "Our cattle are raised exclusively on pasture, eating only grass and forage their entire lives. This natural diet results in beef that's higher in beneficial nutrients like omega-3 fatty acids, vitamins A and E, and antioxidants compared to grain-fed beef. It's better for the animals, better for the environment, and better for your health.",
  },
  {
    question: 'How do you ship your beef products?',
    answer:
      'We deliver all our products directly to your house or apartment. Our recyclable packaging keeps products frozen for up to 16 hours during transit (or on your doorstep). We currently ship to the Hamilton, Kitchener-Waterloo and the GTA.',
  },
  {
    question: 'How should I store and thaw my beef?',
    answer:
      'Keep your beef frozen until ready to use. For best results, thaw in the refrigerator: ground beef takes 12-24 hours, while larger cuts may need 24-48 hours. Never thaw at room temperature. Once thawed, use ground beef within 2 days and larger cuts within 5 days.',
  },
  {
    question:
      'What makes St Isidore Ranch different from other beef producers?',
    answer:
      "We're committed to organic farming practices which ensure the health of the soil, plants, animals, and most importantly, the people who eat our food. Our cattle are humanely raised without hormones or antibiotics, and we maintain full transparency in our farming practices. We're not just producing beef - we're stewarding the land for future generations.",
  },
  {
    question: 'Do you offer bulk purchases?',
    answer:
      'Yes! We offer various bundle options and a bulk order service that can save you money while ensuring regular deliveries of your favorite cuts. Check out our <a class="text-blue-500 hover:underline font-bold" href="/collections">bundles page</a> or <a class="text-blue-500 hover:underline font-bold" href="/contact">contact us</a> to learn more.',
  },
];

export default function FAQ() {
  return (
    <div className="w-full px-4 py-16 bg-white">
      <div className="mx-auto w-full max-w-3xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-stone-900">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Disclosure key={index}>
              {({open}) => (
                <div className="bg-white rounded-lg shadow-sm">
                  <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-4 text-left text-lg font-medium text-stone-900 hover:bg-stone-50 focus:outline-none focus-visible:ring focus-visible:ring-stone-500 focus-visible:ring-opacity-75">
                    <span>{faq.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-stone-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pb-4 pt-2 text-base text-stone-600">
                    <div dangerouslySetInnerHTML={{__html: faq.answer}} />
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  );
}
