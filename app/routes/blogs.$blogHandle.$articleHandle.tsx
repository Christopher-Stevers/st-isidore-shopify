import type {LoaderFunctionArgs} from 'react-router';
import {useLoaderData, type MetaFunction} from 'react-router';
import {Image} from '@shopify/hydrogen';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `St Isidore Ranch | ${data?.article.title ?? ''} article`}];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  const {blogHandle, articleHandle} = params;

  if (!articleHandle || !blogHandle) {
    throw new Response('Not found', {status: 404});
  }

  const {blog} = await context.storefront.query(ARTICLE_QUERY, {
    variables: {blogHandle, articleHandle},
  });

  if (!blog?.articleByHandle) {
    throw new Response(null, {status: 404});
  }

  const article = blog.articleByHandle;

  return json({article});
}

export default function Article() {
  const {article} = useLoaderData<typeof loader>();
  const {title, image, contentHtml, author} = article;

  const publishedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.publishedAt));

  return (
    <div className="article px-8">
      <div className="py-4">
        <h1 className="font-display text-3xl">{title}</h1>
        <span>
          {publishedDate} &middot; {author?.name}
        </span>
      </div>
      <div className="flex gap-2 flex-wrap">
        <div
          dangerouslySetInnerHTML={{__html: contentHtml}}
          className="max-w-[1000px]"
        />
        {image && (
          <Image
            className="max-w-[240px]"
            data={image}
            sizes="90vw"
            loading="eager"
          />
        )}
      </div>
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog#field-blog-articlebyhandle
const ARTICLE_QUERY = `#graphql
  query Article(
    $articleHandle: String!
    $blogHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
    }
  }
` as const;
