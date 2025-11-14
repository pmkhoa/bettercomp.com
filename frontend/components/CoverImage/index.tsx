import { stegaClean } from '@sanity/client/stega';
import { Image } from 'next-sanity/image';

import { urlForImage } from '@/sanity/lib/utils';

interface CoverImageProps {
  image: any;
  priority?: boolean;
}

export default function CoverImage(props: CoverImageProps) {
  const { image: source, priority } = props;
  const image = source?.asset?._ref ? (
    <Image
      className="object-cover"
      fill={true}
      alt={stegaClean(source?.alt) || ''}
      src={urlForImage(source)?.height(720).width(1280).auto('format').url() as string}
      sizes="(max-width: 768px) 100vw, 1600px"
      priority={priority}
    />
  ) : (
    <div className="bg-slate-50" style={{ paddingTop: '100%' }} />
  );

  return <div className="relative aspect-video">{image}</div>;
}
