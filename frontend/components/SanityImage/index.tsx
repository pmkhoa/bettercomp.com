'use client';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Image from 'next/image';

import { urlForImage } from '@/sanity/lib/utils';

interface Props {
  image: SanityImageSource;
  alt?: string;
  caption?: string;
  priority?: boolean;
  className?: string;
}

export const SanityImage = (props: Props) => {
  const { caption, image, className, priority = true, alt } = props;

  return (
    <>
      <Image
        alt={alt || ''}
        sizes="(max-width: 768px) 100vw, 1600px"
        priority={priority}
        className={className}
        src={urlForImage(image)?.url() || ''}
        width={1000}
        height={1000}
      />
      {caption && <small>{caption}</small>}
    </>
  );
};

export default SanityImage;
