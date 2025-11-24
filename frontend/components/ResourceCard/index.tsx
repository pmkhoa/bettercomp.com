import { DateComponent, MotionFadeIn, SanityImage } from '@/components';
import { RESOURCE_CONTENT_TYPES } from '@/utils/constants';
import { find, truncate } from 'lodash';
import Link from 'next/link';
import { CalendarIcon, ClockIcon } from '@/components/Icons';
import cn from 'classnames';
import s from './style.module.css';
import { linkHelpers } from '@/sanity/lib/utils';

const ResourceCard = ({ resource }: { resource: any }) => {
  return (
    <Link href={linkHelpers(resource)} className="flex flex-col h-full">
      <div className="aspect-16/9 relative">
        <MotionFadeIn>
          <SanityImage
            className="absolute inset-0 w-full h-full object-cover"
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
        <h4 className="text-2xl py-6 px-8 font-medium text-blue mt-6">{resource.title}</h4>
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
  );
};

export default ResourceCard;
