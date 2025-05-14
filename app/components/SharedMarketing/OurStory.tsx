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
        <Image
          src="https://cdn.shopify.com/s/files/1/0626/1991/0197/files/475783713_997625315756448_7862330775072287528_n.jpg?v=1746539876"
          alt="The St. Isidore Ranch family"
          width={540}
          height={540}
          className="float-right ml-4 mb-4 hidden md:inline rounded-lg shadow-md object-cover w-[360px] h-[360px] xl:w-[540px] xl:h-[540px]"
        />
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

        <h3>Our Promise to you</h3>
        <p>
          <strong>1. Food is healthcare.</strong>
          <br />
          Every meal you buy from us is going to rebuild your energy, strength,
          and resilience.
        </p>
        <p>
          <strong>2. Grassfed beef should be accessible.</strong>
          <br />
          You shouldn&apos;t need a private chef or a health guru to eat well.
          When you buy our beef we make elite-quality food simple.
        </p>
      </section>
      <Image
        src="https://cdn.shopify.com/s/files/1/0626/1991/0197/files/475783713_997625315756448_7862330775072287528_n.jpg?v=1746539876"
        alt="Our Story"
        width={680}
        height={680}
        className="object-fit flex-1 md:hidden w-[360px] h-[360px]"
      />
    </div>
  );
};

export default OurStory;
