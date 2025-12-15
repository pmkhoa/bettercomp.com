import { get, isEmpty } from 'lodash';
import type { Metadata } from 'next';
import { Suspense } from 'react';

import { NotFound } from '@/components';
import PageBuilderPage from '@/components/PageBuilder';
import { sanityFetch } from '@/sanity/lib/live';
import { getPageQuery, pagesSlugs } from '@/sanity/lib/queries';
import { resolveOpenGraphImage } from '@/sanity/lib/utils';

const RESOURCE_TYPES = ['blog', 'ebook', 'guide', 'webinar', 'tool', 'template'];

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

  const types = RESOURCE_TYPES;
  const terms = '*';
  const topic = '*';

  try {
    const { data: page } = await sanityFetch({
      query: getPageQuery,
      params: { slug, types, terms, topic },
      stega: false,
    });

    let metaObject = {
      title: get(page, 'seo.title') || page?.name || 'Not Found',
    } as any;

    if (get(page, 'seo.description')) {
      metaObject = {
        ...metaObject,
        description: get(page, 'seo.description'),
      };
    }
    const ogImage = resolveOpenGraphImage(get(page, 'seo.ogImage'));

    if (ogImage) {
      metaObject = {
        ...metaObject,
        openGraph: {
          images: ogImage ? [ogImage] : [],
        },
      };
    }

    return metaObject;
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

  let types = RESOURCE_TYPES;
  if (contentType === 'all' || contentType === 'alltypes' || isEmpty(contentType)) {
    types = RESOURCE_TYPES;
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
