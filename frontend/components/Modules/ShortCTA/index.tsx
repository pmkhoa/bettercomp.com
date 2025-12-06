import Link from 'next/link';
import { ShortCTA } from '@/sanity.types';
import { ButtonPrimary, ResolvedLink, PortableText, SanityImage } from '@/components';
import Image from 'next/image';
import { defaultBackground } from '@/utils/constants';
import cn from 'classnames';
import ShortCTABg from '@/assets/images/short-cta-bg.jpg';

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
              useNarrowWidthContent && !showTOC ? 'col-span-9' : 'col-span-12',
              'relative'
            )}
          >
            <div className="h-2 bg-[linear-gradient(81deg,var(--color-orange)_9.79%,var(--color-gold)_84.97%)] w-[70%] absolute inset-0 z-30 rounded-md -left-1" />
            <div className="absolute w-full h-full inset-0">
              {ShortCTABg && (
                <Image
                  src={ShortCTABg}
                  alt="background"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover relative"
                />
              )}
            </div>
            <div className="grid-container p-14 z-20 relative items-start gap-6">
              <div className="cta-content col-span-8">
                <div className="inner-content text-white">
                  {description && <PortableText value={description} />}
                </div>
              </div>
              {ctaButton && ctaButton?.showCtaLink && ctaButton?.linkLabel && (
                <div className="col-start-9 col-span-4 flex justify-end items-start">
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
