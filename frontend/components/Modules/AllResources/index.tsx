'use client';

import {
  DateComponent,
  MotionFadeIn,
  FilterBy,
  ButtonPrimary,
  PortableText,
  ResolvedLink,
  MediaAsset,
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

  console.log('----------debugging: resources----------');
  console.log(getFilterContentTypes(allResources || []));

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
        <div className="container">
          <div className="grid-container gap-12">
            {resources.map((resource: any, index: number) => {
              return (
                <div
                  className="grid-item col-span-4 bg-white rounded-sm overflow-hidden"
                  key={index}
                >
                  <Link href={linkHelpers(resource)} className="flex flex-col h-full">
                    <div className="aspect-16/9 relative">
                      <MotionFadeIn>
                        <SanityImage
                          className="absolute inset-0 w-full h-full"
                          image={resource.coverImage}
                        />
                      </MotionFadeIn>
                      {resource._type && (
                        <div className="resource-type absolute -bottom-4 left-8 bg-green text-blue capitalize p-2 min-w-24 text-center rounded-sm">
                          {resource._type}
                        </div>
                      )}
                    </div>
                    <div className="resource-container flex flex-col justify-between h-full">
                      <h4 className="text-2xl py-6 px-8 font-medium text-blue mt-6">
                        {resource.title}
                      </h4>
                      <div className="flex justify-between items-center pb-6 px-8">
                        <div className="publish-date flex gap-2 items-center">
                          <CalendarIcon />
                          <div className="text-gray-500 text-sm">
                            <DateComponent dateString={resource.date} />
                          </div>
                        </div>
                        {resource.estimatedReadingTime && (
                          <div className="estimate-reading flex gap-2  items-center">
                            <ClockIcon />
                            <div className="text-gray-500 text-sm">
                              {resource.estimatedReadingTime} min read
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
