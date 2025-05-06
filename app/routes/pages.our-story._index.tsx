import {json, type LoaderFunction} from '@shopify/remix-oxygen';
import type {MetaFunction} from '@remix-run/react';
import OurStory from '~/components/SharedMarketing/OurStory';

export const meta: MetaFunction = () => [
  {title: 'About Us'},
  {name: 'description', content: 'Learn more about our mission and story.'},
];

export const loader: LoaderFunction = async ({context}) => {
  return json({});
};

export default function AboutPage() {
  return <OurStory />;
}
