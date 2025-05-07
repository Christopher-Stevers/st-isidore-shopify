import {Image} from '@shopify/hydrogen';

const OurStory = () => {
  return (
    <div
      className="flex flex-col lg:flex-row content-center justify-center justify-items-center gap-24
px-4 py-16 sm:px-16 md:justify-between lg:py-32 lg:px-24 bg-cover"
    >
      <section className="our-story-section">
        <h2>Our Story</h2>

        <h3>Rebuilding Trust in Food, One Box at a Time</h3>
        <p>This isn&apos;t just about beef.</p>
        <p>
          It&apos;s about healing people through real food. Challenging a system
          that&apos;s been broken for decades. And delivering nutrient-dense,
          grassfed beef to those who demand more from what they eat.
        </p>
        <p>
          Our mission started with a wake-up call. After years of conventional
          farming, my grandfather&apos;s health took a serious hit—directly
          linked to chemical exposure on the farm. That moment changed
          everything. Our family had seen the dangers of the conventional food
          system. It would be a long process but we eventually transitioned to
          organic cropping practices and a belief that food is our first and
          most powerful form of healthcare. But even that was just the
          beginning, I&apos;m excited to bring animals back on to every acre
          with regenerative grazing, building soil, and creating a healthier
          ecosystem.
        </p>
        <p>
          We raise our cattle on clean, chemical-free land using holistic,
          regenerative methods. No middlemen. Just real beef, raised with
          integrity, shipped directly to your door.
        </p>
        <p>Because you deserve better—and so does your body.</p>

        <h3>What We Believe</h3>
        <p>
          <strong>1. Food is healthcare.</strong>
          <br />
          Every meal is a chance to rebuild energy, strength, and resilience.
          That starts with clean protein.
        </p>
        <p>
          <strong>2. Grassfed beef should be accessible.</strong>
          <br />
          You shouldn&apos;t need a private chef or a health guru to eat well.
          We make elite-quality food simple.
        </p>

        <h3>Who This Is For</h3>
        <p>
          You&apos;re skeptical. You&apos;ve done the research. Maybe
          you&apos;ve gone plant-based, maybe you&apos;ve counted every macro.
          But deep down, you know something&apos;s still off with the food
          system.
        </p>
        <p>
          You&apos;re not looking for hype. You&apos;re looking for a supply
          chain you can believe in—one that fuels your body and reflects your
          values.
        </p>
        <p>
          People like you aren&apos;t easy to win over. But when you find
          something real, you stick with it. And we&apos;re here for the long
          haul.
        </p>

        <h3>How It Works</h3>
        <p>
          We raise the beef. We pack it with care. We ship it straight to your
          door.
          <br />
          No surprises. No mystery meat. Just results you can feel and flavor
          you can taste.
        </p>

        <h3>Ready to Join the Movement?</h3>
        <p>Try your first box today and feel the difference real food makes.</p>
        <p className="py-4">
          <a
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 text-lg rounded-md inline-block"
            href="/collections"
          >
            <strong>Experience the Difference</strong>
          </a>
        </p>
      </section>
      <Image
        src="https://cdn.shopify.com/s/files/1/0626/1991/0197/files/475783713_997625315756448_7862330775072287528_n.jpg?v=1746539876"
        alt="Our Story"
        width={680}
        height={680}
        className="object-fit flex-1 lg:h-[680px] lg:w-[680px] w-[360px] h-[360px]"
      />
    </div>
  );
};

export default OurStory;
