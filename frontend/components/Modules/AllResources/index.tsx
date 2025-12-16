'use client';

import cn from 'classnames';
import gsap from 'gsap';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { FilterBy, PortableText, ResourceCard } from '@/components';
import { getFilterContentTypes, getFilterTopics } from '@/utils/getFilterResources';

const LIMIT = 12;

export default function AllResourcesModule({ block }: { block: any }) {
  const { enabled, description, resources = [], allResources = [] } = block;

  const [visibleCount, setVisibleCount] = useState(LIMIT);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  if (!enabled) {
    return null;
  }

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + LIMIT, allResources.length));
    // Animate new items appearing
    gsap.fromTo(
      '.resource-card',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }
    );
  };

  return (
    <section className={cn('section-all-resources relative')}>
      <div className="container">
        <div
          className={cn(
            'grid-container justify-between items-center gap-y-8 md:gap-y-16 gap-0',
            'md:gap-4 my-12 md:my-24'
          )}
        >
          <div className={cn('col-span-12 md:col-span-7')}>
            <div className={'hero-description'}>
              <PortableText value={description} />
            </div>
          </div>

          <div className={cn('col-span-12 pt-12 relative', 'md:pt-0 md:col-start-9 md:col-span-4')}>
            <div className="md:hidden h-[4px] bg-[linear-gradient(81deg,var(--color-orange)_9.79%,var(--color-gold)_84.97%)] w-full absolute inset-0 z-10 w-[100%] overflow-hidden" />
            <div className="h-full flex flex-col justify-start gap-4 md:gap-6">
              <FilterBy
                filterType="topic"
                filterList={getFilterTopics(allResources || [])}
                preFilterParam={params.get('topic') || 'All Topics'}
                filterLabel={'Filter By'}
              />
              <FilterBy
                filterType="contentType"
                filterList={getFilterContentTypes(allResources || [])}
                preFilterParam={params.get('contentType') || 'All Types'}
                filterLabel={''}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-midnight-blue py-16 sm:py-12 md:py-32 text-white">
        {!resources.length && (
          <div className="container my-16">
            <div className="text-center">
              <h3>{`No content found. Please try select different type or topic.`}</h3>
            </div>
          </div>
        )}

        <div className="container">
          <div className="grid-container gap-6 md:gap-12">
            {resources.slice(0, visibleCount).map((resource: any, index: number) => {
              return (
                <div
                  className="col-span-12 sm:col-span-6 md:col-span-4 bg-white rounded-sm overflow-hidden"
                  key={index}
                >
                  <ResourceCard resource={resource} />
                </div>
              );
            })}
          </div>
        </div>

        {visibleCount < resources.length && (
          <div className="flex justify-center mt-16">
            <button className="btn-primary" onClick={loadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
