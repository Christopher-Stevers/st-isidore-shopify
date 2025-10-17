import { type LoaderFunction } from "react-router";
import type { MetaFunction } from "react-router";
import OurStory from "~/components/SharedMarketing/OurStory";

export const meta: MetaFunction = () => [
  { title: "About Us" },
  { name: "description", content: "Learn more about our mission and story." },
];

export const loader: LoaderFunction = async ({ context }) => {
  return json({});
};

export default function AboutPage() {
  return <OurStory />;
}
