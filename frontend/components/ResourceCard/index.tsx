import cn from 'classnames';
import Link from 'next/link';

import { DateComponent, MotionFadeIn, SanityImage } from '@/components';
import { CalendarIcon, ClockIcon } from '@/components/Icons';
import { linkHelpers } from '@/sanity/lib/utils';

import s from './style.module.css';

const ResourceCard = ({ resource }: { resource: any }) => {
  return (
    <Link
      href={linkHelpers(resource)}
      className={cn(
        `flex flex-col h-full shadow-md rounded-sm resource-card overflow-hidden`,
        s['resource-card']
      )}
    >
      <div className="aspect-16/9 relative">
        <MotionFadeIn>
          <SanityImage
            className={cn('absolute inset-0 w-full h-full object-cover z-10', s['resource-image'])}
            image={resource.coverImage}
          />
        </MotionFadeIn>
        {resource._type && (
          <div className="resource-type absolute -bottom-[20px] left-8 bg-green text-blue capitalize p-2 min-w-24 text-center rounded-sm z-30">
            {resource._type === 'article' ? 'Blog' : resource._type}
          </div>
        )}
      </div>
      <div className="resource-container flex flex-col justify-between h-full bg-white border-t border-gray-100 relative z-20">
        <h4
          className={cn(
            'text-2xl py-6 px-8 font-medium text-blue mt-6 resource-title',
            s['resource-title']
          )}
        >
          {resource.title}
        </h4>
        <div className="flex justify-between items-center pb-6 px-8">
          <div className="publish-date flex gap-2 items-center">
            <CalendarIcon />
            <div className="text-gray-600 text-sm">
              <DateComponent dateString={resource.date} />
            </div>
          </div>
          {resource.estimatedReadingTime && (
            <div className="estimate-reading flex gap-2  items-center">
              <ClockIcon />
              <div className="text-gray-600 text-sm">{resource.estimatedReadingTime} min read</div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ResourceCard;
