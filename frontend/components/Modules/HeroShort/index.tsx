import cn from 'classnames';
import {
  SanityImage,
  ButtonPrimary,
  MotionFadeIn,
  MediaAsset,
  ResolvedLink,
  PortableText,
} from '@/components';
import { Background, HeroShort } from '@/sanity.types';
import { defaultBackground } from '@/utils/constants';

export default function SectionHeroLarge({ block }: { block: HeroShort }) {
  const { enabled, heading, ctaButton, backgroundDesktop, backgroundMobile } = block;

  if (!enabled) {
    return null;
  }

  return (
    <section className={cn('hero-with-bg overflow-hidden relative bg-blue py-20')}>
      <div className="absolute w-full h-full inset-0">
        {backgroundDesktop && backgroundDesktop.asset && (
          <SanityImage
            image={backgroundDesktop.asset}
            className="w-full h-full object-cover object-right hidden md:block relative"
          />
        )}
        {backgroundMobile && backgroundMobile.asset && (
          <SanityImage
            image={backgroundMobile.asset}
            className="w-full h-full object-cover object-right relative md:hidden"
          />
        )}
      </div>
      <div className={cn('order-1')}>
        <div className="container z-10 relative z-20">
          <div className="grid-container justify-between items-center gap-y-16 gap-0 md:gap-4">
            <div className={cn('col-span-12 md:col-span-5')}>
              <div className={'hero-description'}>
                <h3>{heading}</h3>
              </div>
              <div className="hero__cta mt-12 flex flex-wrap gap-8 items-center">
                {ctaButton && ctaButton.linkLabel && (
                  <ButtonPrimary className="mt-6">
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
