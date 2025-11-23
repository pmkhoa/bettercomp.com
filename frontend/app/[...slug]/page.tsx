import type { Metadata } from 'next';

import Head from 'next/head';
import PageBuilderPage from '@/components/PageBuilder';
import { sanityFetch } from '@/sanity/lib/live';
import { getPageQuery, pagesSlugs } from '@/sanity/lib/queries';
import { GetPageQueryResult, Page as PageType } from '@/sanity.types';
import { resolveOpenGraphImage } from '@/sanity/lib/utils';
import { defaultResourcesType } from '@/utils/constants';
import { NotFound } from '@/components';
import { isEmpty } from 'lodash';

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams?: Promise<{
    contentType: string;
    terms: string;
    topic: string;
  }>;
};

type SlugType = {
  slug: string;
};

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: pagesSlugs,
    // // Use the published perspective in generateStaticParams
    perspective: 'published',
    stega: false,
  });

  return data.map((item: SlugType) => ({
    slug: item.slug.split('/'), // Convert "tech/ai/future" to ["tech", "ai", "future"]
  }));
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const slugPath = params.slug.join('/');
  let types = [];
  let { contentType, terms, topic } = (await props.searchParams) || {};
  contentType = `${contentType}`;

  if (contentType === 'alltypes' || !contentType) {
    types = defaultResourcesType;
  } else {
    types = [contentType];
  }

  if (terms === 'all' || !terms) {
    terms = '*';
  }

  if (topic === 'alltopics' || !topic) {
    topic = '*';
  }
  const { data: page } = await sanityFetch({
    query: getPageQuery,
    params: { slug: slugPath, types, terms, topic },
    // Metadata should never contain stega
    stega: false,
  });

  return {
    title: `${page?.seo?.title || page?.name || 'Not Found'}`,
    description: page?.seo?.description || page?.heading,
    openGraph: {
      title: `${page?.seo?.title || page?.name || 'Not Found'}`,
      images: [
        { url: resolveOpenGraphImage(page?.seo?.ogImage || page?.coverImage)?.url || '' },
      ],
    },
  } satisfies Metadata;
}

export default async function Page(props: Props) {
  const params = await props.params;

  let types = [];
  const slugPath = params.slug.join('/');
  // @ts-ignore: ignore
  const { contentType } = (await props.searchParams) || {};
  let { terms, topic } = (await props.searchParams) || {};

  if (contentType === 'alltypes' || isEmpty(contentType)) {
    types = defaultResourcesType;
  } else {
    types = [contentType];
  }

  if (terms === 'all' || !terms) {
    terms = '*';
  }

  if (topic === 'alltopics' || !topic) {
    topic = '*';
  }

  const [{ data: page }] = await Promise.all([
    sanityFetch({
      query: getPageQuery,
      params: { slug: slugPath, types, terms, topic },
    }),
  ]);

  if (!page?._id) {
    return (
      <div className="py-40">
        <NotFound />
      </div>
    );
  }

  return (
    <div className="page-container">
      <Head>
        <title>{page.heading}</title>
      </Head>
      <PageBuilderPage page={page as GetPageQueryResult} />
    </div>
  );
}
