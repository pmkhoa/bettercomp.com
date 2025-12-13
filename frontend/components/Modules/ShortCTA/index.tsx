import cn from 'classnames';

import { ButtonPrimary, PortableText, ResolvedLink } from '@/components';
import { ShortCTA } from '@/sanity.types';

const ShortCTAModule = ({ block, pageData }: { block: ShortCTA; pageData: any }) => {
  const { enabled, description, ctaButton } = block;

  if (!enabled) {
    return <div />;
  }

  const { showTOC, useNarrowWidthContent } = pageData;

  return (
    <section className={cn('short-cta overflow-hidden relative my-20')}>
      <div className="container">
        <div className="grid-container overflow-hidden">
          <div
            className={cn(
              useNarrowWidthContent && !showTOC ? 'col-span-12 md:col-span-9' : 'col-span-12',
              'relative'
            )}
          >
            <div
              className={cn(
                'bg-[linear-gradient(81deg,var(--color-orange)_9.79%,var(--color-gold)_84.97%)]',
                'w-[70%] absolute inset-0 z-30 rounded-md -left-1 h-2 '
              )}
            />
            <div
              className="absolute w-[cal(100% + 40px)] h-full inset-0"
              style={{
                backgroundImage: `url('/images/bg-graphical-grid.svg')`,
                backgroundSize: 'auto',
                backgroundRepeat: 'repeat',
                backgroundPosition: 'center center',
              }}
            />
            <div className="grid-container p-14 z-20 relative items-start gap-6">
              <div className="cta-content col-span-12 md:col-span-8">
                <div className="inner-content text-white section-richtext">
                  {description && <PortableText value={description} />}
                </div>
              </div>
              {ctaButton && ctaButton?.showCtaLink && ctaButton?.linkLabel && (
                <div className="col-span-12 md:col-start-9 md:col-span-4 flex md:justify-end items-start">
                  <ButtonPrimary className="mt-2">
                    <ResolvedLink link={ctaButton?.link}>{ctaButton?.linkLabel}</ResolvedLink>
                  </ButtonPrimary>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShortCTAModule;
