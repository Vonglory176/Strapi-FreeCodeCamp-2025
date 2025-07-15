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

export async function getHomePage() {
  const path = "/api/home-page"
  const BASE_URL = getStrapiUrl()

  const url = new URL(path, BASE_URL)

  url.search = homePageQuery
  
  return fetchAPI(url.href, { method: "GET" })
}
