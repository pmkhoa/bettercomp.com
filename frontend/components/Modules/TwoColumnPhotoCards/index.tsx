import { SanityImage, ButtonPrimary, PortableText, MediaAsset, ResolvedLink } from '@/components';
import cn from 'classnames';
import { TwoColumnPhotoCards } from '@/sanity.types';
import { defaultBackground } from '@/utils/constants';
import { getImageDimension } from '@/sanity/lib/utils';

export function getTallestAspectRatio(images: any): number {
  if (!images?.length) return 0;

  return images.reduce((maxRatio: any, img: any) => {
    const { width, height } = getImageDimension(img);
    const ratio = height / width;

    return Math.max(maxRatio, ratio);
  }, 0);
}

export default function TwoColumnPhotoCardsModule({ block }: { block: TwoColumnPhotoCards }) {
  if (!block.enabled) return null;
  const { sectionBackground, heading, description, ctaButton, listItem = [] } = block;

  const bgColor = `bg-${sectionBackground}`;

  const tallestRatio = getTallestAspectRatio(listItem.map((content) => content.image));

  return (
    <section
      className={cn(
        'section-module relative',
        'three-column-content',
        sectionBackground === 'sand' ? 'py-12 md:py-24' : 'my-12 md:my-24',
        bgColor
      )}
    >
      <div className="container">
        <div className="flex justify-center items-center text-center mb-8 pb-8">
          <div className="description max-w-3xl">
            {heading && (
              <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4">{heading}</h2>
            )}
            {description && <PortableText value={description} />}
          </div>
        </div>

        <div className="grid-container gap-y-4 md:gap-12">
          {listItem?.map((content) => {
            return (
              <div
                className={cn(
                  'col-span-12 gap-4 border-1 border-gray-100 rounded-md overflow-hidden h-full',
                  'sm:col-span-6 md:col-span-6'
                )}
                key={content._key}
              >
                <div
                  className={cn('content-wrapper grid-container bg-white shadow-md', 'md:gap-4')}
                >
                  <div className="col-span-12 md:col-span-6">
                    {content?.image && (
                      <div className="relative" style={{ aspectRatio: 1 / tallestRatio }}>
                        <SanityImage
                          image={content.image}
                          className="w-full h-full absolute object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-span-12 md:col-span-6 p-6">
                    <div className="inner-content">
                      {content.title && <h5 className="font-medium">{content.title}</h5>}
                    </div>
                    {content.content && (
                      <div className="my-6">
                        <PortableText value={content.content} />
                      </div>
                    )}
                    {content.ctaLink && content.ctaLink?.linkLabel && (
                      <ButtonPrimary>
                        <ResolvedLink link={content.ctaLink?.link}>
                          {content.ctaLink?.linkLabel}
                        </ResolvedLink>
                      </ButtonPrimary>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {ctaButton && ctaButton.linkLabel && (
          <div className="hero__cta mt-12 flex flex-wrap gap-8 items-center justify-center">
            <ButtonPrimary>
              <ResolvedLink link={ctaButton.link}>{ctaButton.linkLabel}</ResolvedLink>
            </ButtonPrimary>
          </div>
        )}
      </div>
    </section>
  );
}
