import {porkOfferConfig} from '~/lib/porkOffers';
import {MarketingHero} from './MarketingHero';
import {MarketingCuts} from './MarketingCuts';
import {MarketingDelivery} from './MarketingDelivery';
import {MarketingPromise} from './MarketingPromise';
import {MarketingHowItWorks} from './MarketingHowItWorks';
import {MarketingNewsletter} from './MarketingNewsletter';
import Testimonials from '~/components/SharedMarketing/Testimonials';
import Claims from '~/components/SharedMarketing/Claims';
import Faq from '~/components/SharedMarketing/FAQ';
import WhyChooseUs from '~/components/SharedMarketing/WhyChooseUs';
import {parseMarketingMetafields} from '~/lib/marketingMetafields';
import { Image } from '@shopify/hydrogen';

interface Metafield {
  key: string;
  value: string;
  namespace: string;
}

interface MarketingSystemProps {
  readonly offer: any;
  readonly metafields: Metafield[];
}

export function MarketingSystem({offer, metafields}: MarketingSystemProps) {
  // Parse metafields into MarketingConfig format
  const config = porkOfferConfig(offer.handle) ?? parseMarketingMetafields(metafields);
  // Sort sections by position
  const sortedSections = [...config.sections].sort(
    (a, b) => a.position - b.position,
  );

  console.log(sortedSections, 'my sorted sections');

  const renderSection = (section: any) => {
    switch (section.id) {
      case 'hero':
        return <MarketingHero key="hero" offer={offer} config={config.hero} />;

      case 'cuts':
        return <MarketingCuts key="cuts" offer={offer} config={config.cuts} />;

      case 'delivery':
        return (
          <MarketingDelivery
            key="delivery"
            offer={offer}
            config={config.delivery}
          />
        );

      case 'promise':
        return (
          <MarketingPromise
            key="promise"
            offer={offer}
            config={config.promise}
          />
        );

      case 'howItWorks':
        return (
          <MarketingHowItWorks key="howItWorks" config={config.howItWorks} />
        );

      case 'claims':
        return config.claims.enabled ? (
          <section key="claims" className="w-full px-4 py-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <Claims />
            </div>
          </section>
        ) : null;

      case 'testimonials':
        return config.testimonials.enabled ? (
          <section key="testimonials" className="w-full">
            <Testimonials />
          </section>
        ) : null;

      case 'faq':
        return config.faq.enabled ? (
          <section key="faq" className="w-full px-4 py-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              {config.faq.items ? (
                <>
                  <h2 className="text-3xl font-display text-center mb-8">{config.faq.title}</h2>
                  <div className="max-w-3xl mx-auto divide-y divide-gray-200">
                    {config.faq.items.map(({question, answer}) => (
                      <details key={question} className="py-5">
                        <summary className="cursor-pointer text-lg font-semibold">{question}</summary>
                        <p className="mt-3 text-gray-700 leading-relaxed">{answer}</p>
                      </details>
                    ))}
                  </div>
                </>
              ) : <Faq />}
            </div>
          </section>
        ) : null;

      case 'whyChooseUs':
        return config.whyChooseUs.enabled ? (
          <section key="whyChooseUs" className="w-full px-4 py-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <WhyChooseUs />
            </div>
          </section>
        ) : null;

      case 'story':
        return config.story.enabled ? (
          <section key="story" className="w-full px-4 py-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center mb-6 overflow-hidden">
                    <Image
                      data={{
                        url: "https://cdn.shopify.com/s/files/1/0626/1991/0197/files/me.png?v=1762894223",
                        altText: "St Isidore Ranch landscape",
                      }}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <h2 className="text-3xl font-display">
                    {config.story.title || 'Our Story'}
                  </h2>
                  <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                    {config.story.content ? (
                      <div
                        dangerouslySetInnerHTML={{__html: config.story.content}}
                      />
                    ) : (
                      <>
                        <p>
                          At St Isidore Ranch, we raise our cattle the
                          old-fashioned way — on open pastures, eating only
                          grass and forage. No hormones, no antibiotics, just
                          pure, natural beef that's better for you and the
                          environment.
                        </p>
                        <p>
                          That's the St. Isidore way: health, transparency, and
                          food you can trust. Every cut comes from animals
                          raised with care and respect, delivering the
                          exceptional taste and quality your family deserves.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null;

      case 'questions':
        return (
          <section key="questions" className="w-full px-4 py-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center space-y-5">
              <h2 className="text-3xl font-display">Got questions?</h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
                Have a question about the pork or your order? Call me at{' '}
                <a href="tel:+15197036780" className="underline">519-703-6780</a>{' '}
                or email{' '}
                <a href="mailto:info@stisidoreranch.com" className="underline">info@stisidoreranch.com</a>.
                {' '}I’m happy to help.
              </p>
              <p className="font-semibold">Chris Stevers</p>
            </div>
          </section>
        );

      case 'order':
        return (
          <section key="order" className="w-full px-4 py-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center space-y-5">
              <h2 className="text-3xl font-display">{offer.title}</h2>
              <p className="text-lg text-gray-700">{offer.handle === 'garlic-pork-sausage-1-lb' ? 'Try a 1 lb pack, or get a few for the freezer.' : 'Ready to stock up? Order your half pig.'}</p>
              <a href={`/products/${offer.handle}`} className="inline-block bg-black text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-neutral-800">Get yours →</a>
            </div>
          </section>
        );

      case 'newsletter':
        return config.newsletter.enabled ? (
          <section key="newsletter" className="w-full px-4 py-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <MarketingNewsletter config={config.newsletter} />
            </div>
          </section>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f7f3] text-[#1b1b1b] flex flex-col">
      {sortedSections
        .filter((section) => section.enabled)
        .map((section) => (
          <div key={section.id} style={{order: section.position}}>
            {renderSection(section)}
          </div>
        ))}
    </div>
  );
}
