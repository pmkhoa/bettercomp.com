import { get } from 'lodash';
import type { Metadata } from 'next';

import { NotFound } from '@/components';
import PageBuilderPage from '@/components/PageBuilder';
import { sanityFetch } from '@/sanity/lib/live';
import { getResourceQuery, resourceSlugs } from '@/sanity/lib/queries';
import { resolveOpenGraphImage } from '@/sanity/lib/utils';
import { defaultResourcesType } from '@/utils/constants';

type Props = {
  params: Promise<{ type: string; slug: string }>;
};

/* -------------------------------------------------------
 * 1. Static Params (SSG)
 * ----------------------------------------------------- */
export async function generateStaticParams() {
  const params: { type: string; slug: string }[] = [];

  for (const type of defaultResourcesType) {
    const { data } = await sanityFetch({
      query: resourceSlugs,
      params: { type },
      perspective: 'published',
      stega: false,
    });

    data.forEach((item: any) =>
      params.push({
        type,
        slug: item.slug,
      })
    );
  }

  return params;
}

/* -------------------------------------------------------
 * 2. Metadata
 * ----------------------------------------------------- */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type, slug } = await params;

  const types = defaultResourcesType;
  const terms = '*';
  const topic = '*';

  const { data: page } = await sanityFetch({
    query: getResourceQuery,
    params: { type, slug, types, terms, topic },
    stega: false,
  });

  if (!page) {
    return { title: 'Not Found' };
  }

  let metaObject = {
    title: get(page, 'seo.title') || get(page, 'title') || 'Not Found',
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
}

/* -------------------------------------------------------
 * 3. Page Component
 * ----------------------------------------------------- */
export default async function Page({ params }: Props) {
  const { type, slug } = await params;

  const types = defaultResourcesType;
  const terms = '*';
  const topic = '*';

  const { data: page } = await sanityFetch({
    query: getResourceQuery,
    params: { type, slug, types, terms, topic },
  });

  if (!page?._id) {
    return (
      <div className="py-40">
        <NotFound />
      </div>
    );
  }

  return (
    <div className="template-resource">
      <PageBuilderPage page={page as any} />;
    </div>
  );
}
