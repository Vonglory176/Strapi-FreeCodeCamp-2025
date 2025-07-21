import qs from "qs"
import { fetchAPI } from "@/utils/fetch-api"
import { getStrapiUrl } from "@/utils/get-strapi-url"

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      on: {
        "blocks.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            logo: {
              populate: {
                image: {
                  fields: ["url", "alternativeText"],
                },
              },
            },
            cta: true,
          },
        },
        "blocks.info-block": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            cta: true,
          },
        },
      },
    },
  },
})

// Loads the home page
export async function getHomePage() {
  const path = "/api/home-page"
  const BASE_URL = getStrapiUrl()

  const url = new URL(path, BASE_URL)

  url.search = homePageQuery
  
  return fetchAPI(url.href, { method: "GET" })
}

// Loads a page by slug
const pageBySlugQuery = (slug: string) => qs.stringify(
  {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      blocks: {
        on: {
          "blocks.hero-section": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              logo: {
                populate: {
                  image: {
                    fields: ["url", "alternativeText"],
                  },
                },
              },
              cta: true,
            },
          },
          "blocks.info-block": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              cta: true,
            },
          },
        },
      },
    },
  },
);

export async function getPageBySlug(slug: string) {
  const path = "/api/pages";
  const BASE_URL = getStrapiUrl();

  const url = new URL(path, BASE_URL);

  url.search = pageBySlugQuery(slug);
  return await fetchAPI(url.href, { method: "GET" });
}

// Loads the global settings (Layout)
const globalSettingQuery = qs.stringify({
  populate: {
    header: {
      populate: {
        logo: {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
          },
        },
        navigation: true,
        cta: true,
      },
    },
    footer: {
      populate: {
        logo: {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
          },
        },
        navigation: true,
        policies: true,
      },
    },
  },
});

export async function getGlobalSettings() {
  const path = "/api/global";
  const BASE_URL = getStrapiUrl();

  const url = new URL(path, BASE_URL);

  url.search = globalSettingQuery;
  return fetchAPI(url.href, { method: "GET" });
}
