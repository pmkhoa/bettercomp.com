import Link from 'next/link';
import { ShortCTA } from '@/sanity.types';
import { ButtonPrimary, ResolvedLink, PortableText, SanityImage } from '@/components';
import { defaultBackground } from '@/utils/constants';
import cn from 'classnames';

const ShortCTAModule = ({ block, pageData }: { block: ShortCTA; pageData: any }) => {
  const { enabled, description, ctaButton, sectionBackground = defaultBackground } = block;

  if (!enabled) {
    return <div />;
  }

  const {
    enabled: backgroundEnabled,
    backgroundType,
    backgroundColor,
    asset,
    textColor,
    showBorderTop,
  } = sectionBackground;

  const bgColor = `bg-${backgroundColor}`;
  const sectionTextColor = `text-${textColor}`;
  const { showTOC, useNarrowWidthContent } = pageData;

  return (
    <section
      className={cn(
        'hero-with-bg overflow-hidden relative',
        backgroundEnabled && backgroundType === 'color' ? 'py-24' : 'my-24',
        backgroundEnabled && backgroundType === 'color' ? bgColor : 'bg-white',
        sectionTextColor,
      )}
    >
      <div className="container">
        <div className="grid-container">
          <div
            className={cn(
              useNarrowWidthContent && !showTOC ? 'col-span-9' : 'col-span-12',
              'relative',
            )}
          >
            {showBorderTop && (
              <div className="h-2 bg-[linear-gradient(81deg,var(--color-orange)_9.79%,var(--color-gold)_84.97%)] w-[70%] absolute inset-0 z-30" />
            )}
            <div className="absolute w-full h-full inset-0">
              {asset && (
                <SanityImage image={asset} className="w-full h-full object-cover relative" />
              )}
            </div>
            <div className="grid-container items-start py-16 pl-16 pr-12 z-20 relative items-start">
              <div className="cta-content col-span-7">
                <div className="inner-content text-white">
                  {description && <PortableText value={description} />}
                </div>
              </div>
              <div className="col-start-9 col-span-4 flex justify-end items-start">
                <ButtonPrimary className="mt-0">
                  <ResolvedLink link={ctaButton?.link}>{ctaButton?.linkLabel}</ResolvedLink>
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShortCTAModule;
