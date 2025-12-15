import { get } from 'lodash';
import type { Metadata } from 'next';

import { PageOnboarding } from '@/components/Onboarding';
import PageBuilderPage from '@/components/PageBuilder';
import { sanityFetch } from '@/sanity/lib/live';
import { getHomeQuery } from '@/sanity/lib/queries';
import { resolveOpenGraphImage } from '@/sanity/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  const terms = '*';
  const topic = '*';
  const types = '*';
  const { data: page } = await sanityFetch({
    query: getHomeQuery,
    params: { terms, topic, types },
    // Metadata should never contain stega
    stega: false,
  });

  let metaObject = {
    title: get(page, 'seo.title'),
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

  return metaObject satisfies Metadata;
}

export default async function Page() {
  const types = '*';
  const terms = '*';
  const topic = '*';

  const [{ data: page }] = await Promise.all([
    sanityFetch({
      query: getHomeQuery,
      params: { terms, topic, types },
    }),
  ]);

  if (!page?._id) {
    return (
      <div className="py-40">
        <PageOnboarding />
      </div>
    );
  }

  return <PageBuilderPage page={page as any} />;
}
