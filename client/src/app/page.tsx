import { BlockRenderer } from "@/components/BlockRenderer";
import { ContentList } from "@/components/ContentList";
import { BlogCard } from "@/components/BlogCard";

import { getHomePage } from "@/data/loaders";
import { notFound } from "next/navigation";

async function loader() {
  const data = await getHomePage();
  if (!data) notFound();

  return { ...data.data };
}

// interface PageProps {
//   searchParams: Promise<{  page?: string; query?: string }>; // SEARCH BITS
// }

export default async function HomeRoute() { // { searchParams }: PageProps
  // const { page, query } = await searchParams;
  const data = await loader();
  const blocks = data?.blocks || [];
  console.log(data);
  return (
    <div>
      <BlockRenderer blocks={blocks} />
      <ContentList
        headline="Featured Articles"
        path="/api/articles"
        component={BlogCard}
        featured
        // showSearch
        // query={query}
      />
    </div>
  );
}
