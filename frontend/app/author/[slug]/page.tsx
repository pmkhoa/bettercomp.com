import type { Metadata } from 'next';
import cn from 'classnames';
import { ResourceCard, SanityImage, PortableText, BlockRenderer } from '@/components';
import { resolveOpenGraphImage } from '@/sanity/lib/utils';
import PageBuilderPage from '@/components/PageBuilder';
import { GetPageQueryResult, Page as PageType } from '@/sanity.types';
import { get } from 'lodash';

import { sanityFetch } from '@/sanity/lib/live';
import { authorQuery } from '@/sanity/lib/queries';

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const { data: page } = await sanityFetch({
    query: authorQuery,
    params: { ...params, terms: '*', types: '*', topic: '*' },
    // Metadata should never contain stega
    stega: false,
  });

  return {
    title: `${get(page, 'firstName')} ${get(page, 'lastName')}`,
    description: get(page, 'jobTitle'),
    openGraph: {
      title: `${get(page, 'firstName')} ${get(page, 'lastName')}`,
      images: [
        {
          url:
            resolveOpenGraphImage(get(page, 'picture') || get(page, 'coverImage'))?.url || '',
        },
      ],
    },
  } satisfies Metadata;
}

export default async function Page(props: Props) {
  const params = await props.params;

  const [{ data: page }] = await Promise.all([
    sanityFetch({
      query: authorQuery,
      params: { ...params, terms: '*', types: '*', topic: '*' },
    }),
  ]);

  if (!page?._id) {
    return (
      <section className={cn('hero-short mb-32 relative flex flex-col')}>
        <div className={cn('order-1')}>
          <div className="container z-10 relative z-20">
            <div className="grid-container justify-center items-center  gap-none">
              <div
                className={cn(
                  'col-span-12 md:col-start-3 md:col-span-8 my-32 md:my-40 text-center',
                )}
              >
                <div className={'my-4'}>
                  <h5 className="text-artic uppercase">Author Not Found</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const { authorBio, firstName, lastName, picture, jobTitle, resources = [] } = page;

  return (
    <>
      <section className={cn('hero-short relative flex flex-col text-white bg-blue py-24')}>
        <div className="container">
          <div className={cn('grid-container relative px-8 text-white gap-12')}>
            <div className="content-photo col-start-2 col-end-5">
              <div className="flex justify-center">
                {picture?.asset?._ref && (
                  <div className="mr-4 aspect-3/4 overflow-hidden">
                    <SanityImage alt={picture?.alt || ''} image={picture} />
                  </div>
                )}
              </div>
            </div>
            <div className="content-bio  col-start-5 col-end-12">
              <div className="flex flex-col">
                {firstName && lastName && (
                  <h4 className="font-bold mb-0 font-normal">
                    {firstName} {lastName}
                  </h4>
                )}
                <div className="">{jobTitle}</div>
                <div className="my-4">
                  <PortableText value={authorBio} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-module insights-container">
        {resources && resources.length > 0 && (
          <div className="container mt-32">
            <div className="heading mb-12 text-center">
              <h4>{`Read more from ${firstName}`} </h4>
            </div>
            <div className="grid-container">
              {resources.map((data: any) => {
                return (
                  <div className="col-span-12 sm:col-span-6 md:col-span-4" key={data._id}>
                    <ResourceCard resource={data} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
      <PageBuilderPage page={page as any} />
    </>
  );
}
