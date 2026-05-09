import Seo from "@site/components/Seo";
import Layout from "@site/components/layout/Layout";
import BlogHero from "@site/components/blog/BlogHero";
import RecentBlogPosts from "@site/components/blog/RecentBlogPosts";
import { useBlogContent } from "@site/hooks/useBlogContent";
import { getInjectedPageData } from "@site/lib/pageDataInjection";

export default function BlogIndex() {
  const { hero, recentPosts, meta } = useBlogContent();
  const injected = getInjectedPageData("/blog/");

  return (
    <Layout>
      <Seo
        title={meta.meta_title || "Blog"}
        description={meta.meta_description || undefined}
        canonical={meta.canonical_url || undefined}
        noindex={meta.noindex}
        ogTitle={meta.og_title || undefined}
        ogDescription={meta.og_description || undefined}
        ogImage={meta.og_image || undefined}
        schemaType={meta.schema_type}
        schemaData={meta.schema_data}
      />

      {/* Hero - CMS-driven, matches About page style */}
      <BlogHero hero={hero} />

      {/* Recent Blog Posts - 6 latest */}
      <RecentBlogPosts data={recentPosts} initialPosts={injected?.blogPosts} />
    </Layout>
  );
}
