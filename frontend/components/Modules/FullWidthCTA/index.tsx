import cn from 'classnames';
import Image from 'next/image';
import {
  ButtonPrimary,
  MotionFadeIn,
  MediaAsset,
  ResolvedLink,
  PortableText,
  SanityImage,
} from '@/components';
import { Background, FullWidthCTA } from '@/sanity.types';
import { defaultBackground } from '@/utils/constants';
import BgGraphicalGrid from '@/assets/images/bg-graphical-grid.svg';

export default function SectionFullWidthCTA({ block }: { block: FullWidthCTA }) {
  const { background = defaultBackground, enabled, description, ctaButton, textAlign } = block;

  if (!enabled) {
    return null;
  }

  const {
    enabled: backgroundEnabled,
    backgroundType,
    backgroundColor,
    asset,
    textColor,
  } = background;

  let bgColor = `bg-blue`;
  if (backgroundColor === 'blueWithGraphic') {
    bgColor = `bg-blue`;
  } else {
    bgColor = `bg-${backgroundColor}`;
  }
  const sectionTextColor = `text-${textColor}`;

  return (
    <section
      className={cn(
        'hero-with-bg overflow-hidden relative',
        sectionTextColor,
        backgroundEnabled && backgroundType === 'color' && bgColor,
        textAlign === 'center' ? 'py-24 md:py-32' : 'py-24'
      )}
    >
      {backgroundEnabled && backgroundColor === 'blueWithGraphic' && (
        <div className="absolute w-full h-[32%] left-0 bottom-0">
          <Image
            src={BgGraphicalGrid}
            alt="background"
            width={1600}
            height={1000}
            className="w-full h-full object-cover relative"
          />
        </div>
      )}
      {backgroundEnabled && backgroundType === 'image' && (
        <div className="absolute w-full h-full inset-0">
          {asset && <SanityImage image={asset} className="w-full h-full object-cover relative" />}
          <div
            className="absolute w-full h-full z-10 bg-black inset-0"
            style={{ opacity: '0.6' }}
          />
        </div>
      )}
      <div className={cn('order-1')}>
        <div className="container z-10 relative z-20">
          <div className="grid-container justify-between items-center gap-y-16 gap-0 md:gap-4">
            <div
              className={cn(
                'col-span-12',
                textAlign === 'left' && 'md:col-span-5',
                textAlign === 'right' && 'md:col-start-8 md:col-end-13',
                textAlign === 'center' &&
                  'md:col-start-3 md:col-end-11 flex flex-col items-center text-center'
              )}
            >
              <div className={'hero-description with-narrow-paragraph'}>
                <PortableText value={description} />
              </div>
              <div className="hero__cta mt-6 flex flex-wrap gap-8 items-center">
                {ctaButton && ctaButton.linkLabel && (
                  <ButtonPrimary className="mt-4">
                    <ResolvedLink link={ctaButton.link}>{ctaButton.linkLabel}</ResolvedLink>
                  </ButtonPrimary>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
