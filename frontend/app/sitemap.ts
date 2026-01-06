import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

import { sanityFetch } from '@/sanity/lib/live';
import { sitemapData } from '@/sanity/lib/queries';

/**
 * This file creates a sitemap (sitemap.xml) for the application. Learn more about sitemaps in Next.js here: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 * Be sure to update the `changeFrequency` and `priority` values to match your application's content.
 */

// [page, author, "blog", "ebook", "caseStude", "guide", "webinar", "tool", "template"]
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPostsAndPages = await sanityFetch({
    query: sitemapData,
  });
  const headersList = await headers();
  const sitemap: MetadataRoute.Sitemap = [];
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const host = headersList.get('x-forwarded-host') || headersList.get('host');

  const domain = `${protocol}://${host}`;

  sitemap.push({
    url: domain as string,
    lastModified: new Date(),
    priority: 1,
    changeFrequency: 'monthly',
  });

  if (allPostsAndPages != null && allPostsAndPages.data.length != 0) {
    let priority: number = 1;
    let changeFrequency:
      | 'monthly'
      | 'always'
      | 'hourly'
      | 'daily'
      | 'weekly'
      | 'yearly'
      | 'never'
      | undefined = 'monthly';
    let url: string = domain;

    for (const p of allPostsAndPages.data) {
      switch (p._type) {
        case 'page':
          priority = 0.7;
          changeFrequency = 'weekly';
          url = `${domain}/${p.slug}`;
          break;
        case 'blog':
        case 'guide':
        case 'webinar':
        case 'tool':
        case 'template':
        case 'author':
        case 'ebook':
          priority = 0.5;
          changeFrequency = 'never';
          url = `${domain}/${p._type}/${p.slug}`;
          break;
      }
      sitemap.push({
        lastModified: p._updatedAt || new Date(),
        priority,
        changeFrequency,
        url,
      });
    }
  }

  return sitemap;
}
