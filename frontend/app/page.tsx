import type { Metadata } from 'next';
import { Page as PageType } from '@/sanity.types';
import { sanityFetch } from '@/sanity/lib/live';
import { PageOnboarding } from '@/app/components/Onboarding';
import { getHomeQuery } from '@/sanity/lib/queries';
import { resolveOpenGraphImage } from '@/sanity/lib/utils';
import { get } from 'lodash';
import PageBuilderPage from '@/app/components/PageBuilder';
import { defaultInsightTypes } from '@/utils/constants';

export async function generateMetadata(): Promise<Metadata> {
  const terms = '*';
  const topic = '*';
  const { data: page } = await sanityFetch({
    query: getHomeQuery,
    params: { terms, topic },
    // Metadata should never contain stega
    stega: false,
  });

  return {
    title: get(page, 'seo.title'),
    description: get(page, 'seo.description'),
    openGraph: {
      title: get(page, 'seo.title'),
      images: [
        {
          url: resolveOpenGraphImage(get(page, 'seo.ogImage'))?.url || '',
        },
      ],
    },
  } satisfies Metadata;
}

export default async function Page() {
  const terms = '*';
  const topic = '*';

  const [{ data: page }] = await Promise.all([
    sanityFetch({
      query: getHomeQuery,
      params: { terms, topic },
    }),
  ]);

  console.log('----------debugging----------');
  console.log(page);

  if (!page?._id) {
    return (
      <div className="py-40">
        <PageOnboarding />
      </div>
    );
  }

  return <PageBuilderPage page={page as PageType} />;
}
