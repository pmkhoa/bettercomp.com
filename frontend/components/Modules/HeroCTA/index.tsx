import cn from 'classnames';

import { ButtonPrimary, PortableText, ResolvedLink, SanityImage } from '@/components';
import { HeroCTA } from '@/sanity.types';

export default function SectionHeroCTA({ block, pageData }: { block: HeroCTA; pageData: any }) {
  const { enabled, description, ctaButton, backgroundDesktop, backgroundMobile } = block;

  if (!enabled) {
    return null;
  }

  const { showTOC, useNarrowWidthContent } = pageData;

  return (
    <section className={cn('hero-cta overflow-hidden relative bg-blue md:bg-transparent')}>
      <div className="container z-10 relative z-20 text-white py-16 md:py-20 bg-blue px-4 md:px-20">
        <div className="grid-container">
          <div
            className={cn(
              useNarrowWidthContent && !showTOC ? 'col-span-9' : 'col-span-12',
              'relative'
            )}
          >
            <div className="md:absolute w-full md:h-full inset-0">
              {backgroundDesktop && backgroundDesktop.asset && (
                <SanityImage
                  image={backgroundDesktop.asset}
                  className="w-full h-full object-contain object-right hidden md:block relative"
                />
              )}
              {backgroundMobile && backgroundMobile.asset && (
                <SanityImage
                  image={backgroundMobile.asset}
                  className="w-full h-full object-contain object-right relative md:hidden mb-8"
                />
              )}
            </div>

            <div className="grid-container justify-between items-center gap-y-16 gap-0 md:gap-4">
              <div className={cn('col-span-12 md:col-span-7')}>
                <div className={'hero-description with-narrow-paragraph'}>
                  <PortableText value={description} />
                </div>
                <div className="hero__cta mt-4 flex flex-wrap gap-8 items-center">
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
      </div>
    </section>
  );
}
