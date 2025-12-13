import cn from 'classnames';

import { ButtonPrimary, ResolvedLink, SanityImage } from '@/components';
import { HeroShort } from '@/sanity.types';

export default function SectionHeroLarge({ block }: { block: HeroShort }) {
  const { enabled, heroImage, heroImageMobile, heading, ctaButton } = block;

  if (!enabled) {
    return null;
  }

  return (
    <section className={cn('hero-with-bg overflow-hidden relative bg-blue')}>
      <div className="container z-10 relative z-20 text-white  py-30">
        <div className="grid-container justify-between items-center gap-y-16 gap-0 md:gap-4">
          <div className={cn('col-span-12 md:col-span-8 relative z-20')}>
            <div className={'hero-description'}>
              <h3 className="my-0">{heading}</h3>
            </div>
            {ctaButton && ctaButton.linkLabel && (
              <div className="hero__cta mt-12 flex flex-wrap gap-8 items-center">
                <ButtonPrimary className="mt-6">
                  <ResolvedLink link={ctaButton.link}>{ctaButton.linkLabel}</ResolvedLink>
                </ButtonPrimary>
              </div>
            )}
          </div>
        </div>
        {heroImage && (
          <div className="absolute right-0 h-full w-full max-w-[540px] top-0 hidden md:block">
            <SanityImage
              image={heroImage}
              className="w-full h-full object-cover object-right relative"
            />
          </div>
        )}
        {heroImageMobile && (
          <div className="absolute right-0 h-full w-full max-w-[540px] top-0 md:hidden">
            <SanityImage
              image={heroImageMobile}
              className="w-full h-full object-cover object-right relative"
            />
          </div>
        )}
      </div>
    </section>
  );
}
