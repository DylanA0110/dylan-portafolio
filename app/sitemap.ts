import type { MetadataRoute } from 'next';

import { blogPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  const base = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
    },
  ];

  const posts = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...base, ...posts];
}
