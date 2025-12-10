import { DateComponent, MotionFadeIn, SanityImage } from '@/components';
import Link from 'next/link';
import { CalendarIcon, ClockIcon } from '@/components/Icons';
import cn from 'classnames';
import s from './style.module.css';
import { linkHelpers } from '@/sanity/lib/utils';

const ResourceCardFeature = ({ resource }: { resource: any }) => {
  return (
    <Link
      href={linkHelpers(resource)}
      className={cn(
        'flex flex-col h-full relative resource-card overflow-hidden',
        s['resource-card']
      )}
    >
      <div className="aspect-4/5 md:aspect-16/9 relative rounded-md overflow-hidden">
        <MotionFadeIn>
          <SanityImage
            className={cn(
              'absolute inset-0 w-full h-full object-cover resource-image',
              s['resource-image']
            )}
            image={resource.coverImage}
          />
        </MotionFadeIn>
        <div className="absolute w-full h-full z-10 bg-black inset-0" style={{ opacity: '0.5' }} />
      </div>
      <div className="resource-container z-10 absolute bottom-0 left-0 w-full h-auto px-8 pb-2">
        {resource._type && (
          <div className="resource-type bg-green text-blue capitalize p-2 min-w-24 text-center rounded-sm inline-block">
            {resource._type === 'article' ? 'Blog' : resource._type}
          </div>
        )}
        <h4 className={cn('text-2xl py-4 font-medium text-white', s['resource-title'])}>
          {resource.title}
        </h4>
        <div className="flex justify-between items-center pb-4">
          <div className="publish-date flex gap-2 items-center">
            <CalendarIcon />
            <div className="text-white text-sm">
              <DateComponent dateString={resource.date} />
            </div>
          </div>
          {resource.estimatedReadingTime && (
            <div className="estimate-reading flex gap-2  items-center">
              <ClockIcon />
              <div className="text-white text-sm">{resource.estimatedReadingTime} min read</div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ResourceCardFeature;
