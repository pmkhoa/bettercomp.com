import { MediaAsset } from '@/sanity.types';
import { get } from 'lodash';
import { urlForImage, urlForAsset } from '@/sanity/lib/utils';
import { BackgroundVideo, SanityImage } from '@/components';

export default function Media({
  mediaAsset,
  showPopup = false,
  priority = false,
  className,
}: {
  mediaAsset: MediaAsset;
  showPopup?: boolean;
  priority?: boolean;
  className?: string;
}) {
  const mediaType = mediaAsset.mediaType;

  if (mediaType === 'withEmbedded') {
    const embeddedContent = mediaAsset.embeddedContent;
    return (
      <div className="embed-container w-full">
        {embeddedContent && (
          <div
            className="content-embed w-full responsive-iframe-container"
            dangerouslySetInnerHTML={{
              __html: embeddedContent,
            }}
          />
        )}
      </div>
    );
  }

  if (mediaType === 'withBackgroundVideo') {
    const backgroundVideo = mediaAsset.backgroundVideo;
    return (
      <div className={'background-container w-full h-full'}>
        {backgroundVideo && urlForAsset(backgroundVideo) && (
          <div className={`content-embed w-full responsive-iframe-container h-full  ${className}`}>
            <BackgroundVideo src={urlForAsset(backgroundVideo)} />
          </div>
        )}
      </div>
    );
  }

  if (showPopup) {
    const image = mediaAsset.image;

    return (
      <div
        className={`cursor-pointer with-image with-popup`}
        data-fancybox
        data-src={urlForImage(image)?.url() || ''}
        role="button"
      >
        {image?.asset && (
          <SanityImage
            image={image}
            alt={image?.alt}
            className={`w-full ${className}`}
            caption={get(image, 'caption')}
            priority={priority}
          />
        )}
      </div>
    );
  }

  return (
    <>
      {mediaAsset?.image?.asset && (
        <SanityImage
          image={mediaAsset?.image}
          alt={mediaAsset?.image?.alt || 'Vigor ship photo'}
          caption={get(mediaAsset, 'image.caption')}
          className={`w-full ${className}`}
          priority={priority}
        />
      )}
    </>
  );
}
