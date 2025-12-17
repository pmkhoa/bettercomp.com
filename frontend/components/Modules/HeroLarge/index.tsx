import cn from 'classnames';

import {
  ButtonPrimary,
  MediaAsset,
  MotionFadeIn,
  PortableText,
  ResolvedLink,
  SanityImage,
} from '@/components';
import { HeroLarge } from '@/sanity.types';
import { sanitizeToken } from '@/sanity/lib/utils';
import { defaultBackground } from '@/utils/constants';

export default function SectionHeroLarge({ block }: { block: HeroLarge }) {
  const {
    sectionBackground = defaultBackground,
    enabled,
    highlightCustomerPhotos,
    description,
    heroImage,
    ctaButton,
  } = block;

  if (!enabled) {
    return null;
  }

  const {
    enabled: backgroundEnabled,
    backgroundType,
    backgroundColor,
    asset,
    textColor,
  } = sectionBackground;

  const bgColor = `bg-${sanitizeToken(backgroundColor)}`;
  const sectionTextColor = `text-${sanitizeToken(textColor)}`;

  return (
    <section
      className={cn(
        `hero-with-bg overflow-hidden relative `,
        backgroundEnabled && backgroundType === 'color'
          ? 'py-10 sm:py-16 md:py-20'
          : 'my-10 sm:my-16 md:my-20',
        backgroundEnabled && backgroundType === 'color' ? bgColor : 'bg-white',
        sectionTextColor
      )}
    >
      {backgroundEnabled && backgroundType === 'image' && (
        <div className="absolute w-full h-full inset-0">
          {asset && <SanityImage image={asset} className="w-full h-full object-cover relative" />}
          <div
            className="absolute w-full h-full z-10 bg-black inset-0"
            style={{ opacity: '0.7' }}
          />
        </div>
      )}
      <div className={cn('order-1')}>
        <div className="container z-10 relative z-20">
          <div className="grid-container justify-between items-center gap-y-8 md:gap-y-16 gap-0 md:gap-4">
            <div className={cn('col-span-12 md:col-span-5')}>
              <div className={'hero-description'}>
                <PortableText value={description} />
              </div>
              <div className="hero__cta mt-6 md:mt-10 flex flex-wrap gap-8 items-center">
                {ctaButton && ctaButton.linkLabel && (
                  <ButtonPrimary className="mt-0">
                    <ResolvedLink link={ctaButton.link}>{ctaButton.linkLabel}</ResolvedLink>
                  </ButtonPrimary>
                )}
              </div>
              {highlightCustomerPhotos && (
                <div className="highlight-customer-photos flex gap-4 mt-10 mb-8 items-center justify-left">
                  <div className="w-20 h-8">
                    <SanityImage
                      image={highlightCustomerPhotos}
                      alt={highlightCustomerPhotos.alt}
                    />
                  </div>
                  <small>{highlightCustomerPhotos.alt}</small>
                </div>
              )}
            </div>
            <div className={cn('h-full flex items-center justify-end col-span-12 md:col-span-7')}>
              <div className="relative w-full">
                <MotionFadeIn>
                  <div className="relative z-30 w-full">
                    {heroImage && <MediaAsset mediaAsset={heroImage} priority />}
                  </div>
                </MotionFadeIn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
