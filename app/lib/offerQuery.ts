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
        {namespace: "app--289113440257--custom", key: "hero_title"},
        {namespace: "app--289113440257--custom", key: "hero_subtitle"},
        {namespace: "app--289113440257--custom", key: "hero_cta_text"},
        {namespace: "app--289113440257--custom", key: "hero_cta_url"},
        {namespace: "app--289113440257--custom", key: "hero_bullets"},
        {namespace: "app--289113440257--custom", key: "section_hero_enabled"},
        {namespace: "app--289113440257--custom", key: "section_hero_position"},
        {namespace: "app--289113440257--custom", key: "cuts_title"},
        {namespace: "app--289113440257--custom", key: "cuts_items"},
        {namespace: "app--289113440257--custom", key: "cuts_show_images"},
        {namespace: "app--289113440257--custom", key: "section_cuts_enabled"},
        {namespace: "app--289113440257--custom", key: "section_cuts_position"},
        {namespace: "app--289113440257--custom", key: "delivery_title"},
        {namespace: "app--289113440257--custom", key: "delivery_content"},
        {namespace: "app--289113440257--custom", key: "delivery_icon"},
        {namespace: "app--289113440257--custom", key: "section_delivery_enabled"},
        {namespace: "app--289113440257--custom", key: "section_delivery_position"},
        {namespace: "app--289113440257--custom", key: "promise_title"},
        {namespace: "app--289113440257--custom", key: "promise_content"},
        {namespace: "app--289113440257--custom", key: "promise_guarantee"},
        {namespace: "app--289113440257--custom", key: "section_promise_enabled"},
        {namespace: "app--289113440257--custom", key: "section_promise_position"},
        {namespace: "app--289113440257--custom", key: "how_it_works_title"},
        {namespace: "app--289113440257--custom", key: "how_it_works_steps"},
        {namespace: "app--289113440257--custom", key: "section_how_it_works_enabled"},
        {namespace: "app--289113440257--custom", key: "section_how_it_works_position"},
        {namespace: "app--289113440257--custom", key: "testimonials_enabled"},
        {namespace: "app--289113440257--custom", key: "testimonials_title"},
        {namespace: "app--289113440257--custom", key: "section_testimonials_position"},
        {namespace: "app--289113440257--custom", key: "claims_enabled"},
        {namespace: "app--289113440257--custom", key: "claims_title"},
        {namespace: "app--289113440257--custom", key: "section_claims_position"},
        {namespace: "app--289113440257--custom", key: "faq_enabled"},
        {namespace: "app--289113440257--custom", key: "faq_title"},
        {namespace: "app--289113440257--custom", key: "section_faq_position"},
        {namespace: "app--289113440257--custom", key: "why_choose_us_enabled"},
        {namespace: "app--289113440257--custom", key: "why_choose_us_title"},
        {namespace: "app--289113440257--custom", key: "section_why_choose_us_position"},
        {namespace: "app--289113440257--custom", key: "story_enabled"},
        {namespace: "app--289113440257--custom", key: "story_title"},
        {namespace: "app--289113440257--custom", key: "story_content"},
        {namespace: "app--289113440257--custom", key: "section_story_position"},
        {namespace: "app--289113440257--custom", key: "newsletter_enabled"},
        {namespace: "app--289113440257--custom", key: "newsletter_title"},
        {namespace: "app--289113440257--custom", key: "newsletter_subtitle"},
        {namespace: "app--289113440257--custom", key: "newsletter_cta_text"},
        {namespace: "app--289113440257--custom", key: "section_newsletter_position"}
      ]) {
        key
        value
        namespace
      }
    }
  }
` as const;

