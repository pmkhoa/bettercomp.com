import { Suspense } from 'react';

import type { Metadata } from 'next';
import PageBuilderPage from '@/components/PageBuilder';
import { sanityFetch } from '@/sanity/lib/live';
import { getPageQuery, pagesSlugs } from '@/sanity/lib/queries';
import { defaultResourcesType } from '@/utils/constants';
import { NotFound } from '@/components';
import { isEmpty, get } from 'lodash';

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams?: Promise<{
    contentType?: string;
    terms?: string;
    topic?: string;
    pg?: number;
  }>;
};

type SlugType = {
  slug: string;
};

// Build static paths
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: pagesSlugs,
    perspective: 'published',
    stega: false,
  });

  return data.map((item: SlugType) => ({
    slug: item.slug.split('/'),
  }));
}

// --- METADATA ---
export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug: slugArray } = await props.params;
  const slug =
    Array.isArray(slugArray) && slugArray.length > 0 ? slugArray[slugArray.length - 1] : '';

  const types = ['article', 'ebook', 'caseStudy'];
  const terms = '*';
  const topic = '*';

  try {
    const { data: page } = await sanityFetch({
      query: getPageQuery,
      params: { slug, types, terms, topic },
      stega: false,
    });

    return {
      title: get(page, 'seo.title') || page?.name || 'Not Found',
      description: get(page, 'seo.description') || '',
      openGraph: {
        title: get(page, 'seo.title') || page?.name || 'Not Found',
        description: get(page, 'seo.description') || '',
      },
    };
  } catch (err) {
    console.error('Metadata error:', err);

    return {
      title: 'Not Found',
      description: 'Page not found',
    };
  }
}

// --- PAGE RENDER ---
export default async function Page(props: Props) {
  const { slug: slugArray } = await props.params;

  const slug =
    Array.isArray(slugArray) && slugArray.length > 0 ? slugArray[slugArray.length - 1] : '';

  const searchParams = (await props.searchParams) || {};

  let { terms, topic } = searchParams;
  const { contentType = '' } = searchParams;

  if (terms === 'all' || !terms) {
    terms = '*';
  }

  if (topic === 'all' || topic === 'alltopics' || !topic) {
    topic = '*';
  }

  let types = ['article', 'ebook', 'guide', 'webinar', 'tool', 'template'];
  if (contentType === 'all' || contentType === 'alltypes' || isEmpty(contentType)) {
    types = ['article', 'ebook', 'guide', 'webinar', 'tool', 'template'];
  } else {
    types = [contentType];
  }

  try {
    const { data: page } = await sanityFetch({
      query: getPageQuery,
      params: { slug, types, terms, topic },
    });

    if (!page?._id) {
      return (
        <div className="py-40">
          <NotFound />
        </div>
      );
    }

    return (
      <div className="page-container">
        <Suspense fallback={null}>
          <PageBuilderPage page={page} />
        </Suspense>
      </div>
    );
  } catch (err) {
    console.error('Page load error:', err);

    return (
      <div className="py-40">
        <NotFound />
      </div>
    );
  }
}
