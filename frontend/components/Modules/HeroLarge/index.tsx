import cn from 'classnames';
import {
  ButtonPrimary,
  MotionFadeIn,
  MediaAsset,
  ResolvedLink,
  PortableText,
} from '@/components';
import { Background, HeroLarge } from '@/sanity.types';
import { defaultBackground } from '@/utils/constants';

export default function SectionHeroLarge({ block }: { block: HeroLarge }) {
  const {
    sectionBackground = defaultBackground,
    enabled,
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

  const bgColor = `bg-${backgroundColor}`;
  const sectionTextColor = `text-${textColor}`;

  return (
    <section
      className={cn(
        'hero-with-bg overflow-hidden relative',
        backgroundEnabled && backgroundType === 'color' ? 'py-24' : 'my-24',
        backgroundEnabled && backgroundType === 'color' ? bgColor : 'bg-white',
        sectionTextColor,
      )}
    >
      {backgroundEnabled && backgroundType === 'image' && (
        <div className="absolute w-full h-full inset-0" />
      )}
      <div className={cn('order-1')}>
        <div className="container z-10 relative z-20">
          <div className="grid-container justify-between items-center gap-y-16 gap-0 md:gap-4">
            <div className={cn('col-span-12 md:col-span-5')}>
              <div className={'hero-description'}>
                <PortableText value={description} />
              </div>
              <div className="hero__cta mt-12 flex flex-wrap gap-8 items-center">
                {ctaButton && ctaButton.linkLabel && (
                  <ButtonPrimary className="mt-6">
                    <ResolvedLink link={ctaButton.link}>{ctaButton.linkLabel}</ResolvedLink>
                  </ButtonPrimary>
                )}
              </div>
            </div>
            <div
              className={cn('h-full flex items-center justify-end col-span-12 md:col-span-7')}
            >
              <div className="relative">
                <MotionFadeIn>
                  <div className="relative z-30">
                    {heroImage && <MediaAsset mediaAsset={heroImage} />}
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
