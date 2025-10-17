export const OFFER_QUERY = `#graphql
  query OfferProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      featuredImage {
        url
        altText
        width
        height
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 10) {
        nodes {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
      }
      images(first: 10) {
        nodes {
          url
          altText
          width
          height
        }
      }
      metafields(identifiers: [
        {namespace: "custom", key: "offer_type"},
        {namespace: "custom", key: "campaign_name"},
        {namespace: "custom", key: "start_date"},
        {namespace: "custom", key: "end_date"},
        {namespace: "custom", key: "target_audience"},
        {namespace: "custom", key: "highlights"},
        {namespace: "farmrebel", key: "offer"}
      ]) {
        key
        value
        namespace
      }
    }
  }
` as const;

