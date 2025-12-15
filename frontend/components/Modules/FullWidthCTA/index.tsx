import cn from 'classnames';

import { ButtonPrimary, PortableText, ResolvedLink, SanityImage } from '@/components';
import { FullWidthCTA } from '@/sanity.types';
import { sanitizeToken } from '@/sanity/lib/utils';
import { defaultBackground } from '@/utils/constants';

export default function SectionFullWidthCTA({
  block,
  pageData,
}: {
  block: FullWidthCTA;
  pageData: any;
}) {
  const { background = defaultBackground, enabled, description, ctaButton, textAlign } = block;

  if (!enabled) {
    return null;
  }

  const { useNarrowWidthContent } = pageData;

  const {
    enabled: backgroundEnabled,
    backgroundType,
    backgroundColor,
    showBorderTop,
    asset,
    textColor,
  } = background;

  const bgColor = `bg-${sanitizeToken(backgroundColor)}`;
  const sectionTextColor = `text-${sanitizeToken(textColor)}`;

  return (
    <section className={cn('full-width-cta overflow-visible relative', sectionTextColor)}>
      <div
        className={cn(
          'z-10 relative z-20',
          useNarrowWidthContent && `container`,
          sanitizeToken(backgroundColor) === 'blueWithGraphic' ? 'bg-blue' : bgColor
        )}
      >
        {showBorderTop && (
          <div className="hidden h-2 bg-[linear-gradient(81deg,var(--color-orange)_9.79%,var(--color-gold)_84.97%)] w-full absolute inset-0 z-10 w-[60%] md:w-[50%] overflow-hidden left-[20%] md:left-[25%] -top-1" />
        )}
        <div className="grid-container overflow-hidden">
          <div className={cn('col-span-12', 'relative')}>
            {backgroundEnabled && sanitizeToken(backgroundColor) === 'blueWithGraphic' && (
              <div
                className="absolute w-full h-[32%] left-0 bottom-0 bg-center bg-repeat"
                style={{
                  backgroundImage: `url('/images/bg-graphical-grid.svg')`,
                  backgroundSize: 'auto',
                  backgroundRepeat: 'repeat',
                  backgroundPosition: 'center center',
                }}
              />
            )}
            {backgroundEnabled && backgroundType === 'image' && (
              <div className="absolute w-full h-full inset-0">
                {asset && (
                  <SanityImage image={asset} className="w-full h-full object-cover relative" />
                )}
                <div
                  className="absolute w-full h-full z-10 bg-black inset-0"
                  style={{ opacity: '0.6' }}
                />
              </div>
            )}

            <div
              className={cn(
                'grid-container justify-between items-center gap-y-16 gap-0 md:gap-4 relative z-10',
                sanitizeToken(textAlign) === 'center' ? 'py-24 md:py-32' : 'py-24'
              )}
            >
              <div
                className={cn(
                  'col-span-12',
                  sanitizeToken(textAlign) === 'left' && 'md:col-span-5',
                  sanitizeToken(textAlign) === 'right' && 'md:col-start-8 md:col-end-13',
                  sanitizeToken(textAlign) === 'center' &&
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
      </div>
    </section>
  );
}
