'use client';

import {
  DateComponent,
  MotionFadeIn,
  FilterBy,
  ButtonPrimary,
  PortableText,
  ResolvedLink,
  MediaAsset,
  ResourceCard,
  SanityImage,
} from '@/components';
import Link from 'next/link';
import { CalendarIcon, ClockIcon } from '@/components/Icons';
import { AllResources } from '@/sanity.types';
import { defaultBackground } from '@/utils/constants';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getFilterContentTypes, getFilterTopics } from '@/utils/getFilterResources';
import { filter } from 'lodash';
import cn from 'classnames';
import gsap from 'gsap';
import { linkHelpers } from '@/sanity/lib/utils';

const LIMIT = 12;

export default function AllResourcesModule({ block }: { block: AllResources }) {
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
      '.insight-card',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 },
    );
  };

  return (
    <section className={cn('section-all-resources relative')}>
      <div className="container">
        <div
          className={cn(
            'grid-container justify-between items-center gap-y-16 gap-0',
            'md:gap-4 my-24',
          )}
        >
          <div className={cn('col-span-12 md:col-span-7')}>
            <div className={'hero-description'}>
              <PortableText value={description} />
            </div>
          </div>
          <div className={cn('col-span-12', 'md:col-start-9 md:col-span-4')}>
            <div className="h-full flex flex-col justify-start gap-8">
              <FilterBy
                filterType="topic"
                filterList={getFilterTopics(allResources || [])}
                preFilterParam={params.get('topic') || 'All Topics'}
                filterLabel={'Filter By'}
              />
              <FilterBy
                filterType="contentType"
                filterList={getFilterContentTypes(allResources || [])}
                preFilterParam={params.get('types') || 'All Types'}
                filterLabel={''}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-midnight-blue py-32 text-white">
        {!resources.length && (
          <div className="container my-16">
            <div className="text-center">
              <h3>{`No content found. Please try select different type or topic.`}</h3>
            </div>
          </div>
        )}

        <div className="container">
          <div className="grid-container gap-12">
            {resources.slice(0, visibleCount).map((resource: any, index: number) => {
              return (
                <div className="col-span-4 bg-white rounded-sm overflow-hidden" key={index}>
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
