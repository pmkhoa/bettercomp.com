import { SanityImage, ButtonPrimary, PortableText, MediaAsset, ResolvedLink } from '@/components';
import cn from 'classnames';
import Image from 'next/image';
import { IconCards } from '@/sanity.types';
import { defaultBackground } from '@/utils/constants';
import iconCardsBg from '@/assets/images/bg-graphical-grid.svg';

export default function IconCardsModule({ block }: { block: IconCards }) {
  if (!block.enabled) return null;
  const { heading, description, ctaButton, listItem, layout } = block;

  return (
    <section className={cn('section-module relative', 'icon-cards bg-blue py-16 md:py-24')}>
      <div className="h-4 bg-[linear-gradient(81deg,var(--color-orange)_9.79%,var(--color-gold)_84.97%)] w-full max-w-[740px] left-[25%] absolute top-[-8px] z-20" />
      <div
        className="bg-top  w-full h-[50%] absolute top-0 left-0 z-10"
        style={{ backgroundImage: `url('/images/bg-graphical-grid.svg')`, backgroundSize: '100%' }}
      />
      <div className="container z-20 relative">
        <div className="flex justify-center items-center text-center mb-8 pb-8">
          <div className="description max-w-3xl text-white">
            {heading && (
              <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4">{heading}</h2>
            )}
            {description && <PortableText value={description} />}
          </div>
        </div>

        <div className="grid-container gap-y-6  md:gap-12">
          {listItem?.map((content) => {
            return (
              <div
                className={cn(
                  'col-span-12 sm:col-span-6 gap-4 rounded-sm overflow-hidden',
                  layout === 'two' && 'md:col-span-6',
                  layout === 'three' && 'md:col-span-4'
                )}
                key={content._key}
              >
                <div
                  className={cn(
                    'content-wrapper bg-white shadow-md',
                    layout === 'two' && 'p-10 md:p-12',
                    layout === 'three' && 'p-8 md:p-10'
                  )}
                >
                  {content?.image && (
                    <div className="relative mb-8">
                      <SanityImage image={content.image} className="w-full max-h-[120px]" />
                    </div>
                  )}
                  <div className="inner-content mb-4">
                    {content.subTitle && (
                      <p className="font-bold font-serif text-green">{content.subTitle}</p>
                    )}
                    {content.title && <h4 className="font-medium">{content.title}</h4>}
                  </div>
                  {content.content && (
                    <div className="mb-8">
                      <PortableText value={content.content} />
                    </div>
                  )}
                  {content.ctaLink && content.ctaLink.linkLabel && (
                    <ButtonPrimary>
                      <ResolvedLink link={content.ctaLink.link}>
                        {content.ctaLink.linkLabel}
                      </ResolvedLink>
                    </ButtonPrimary>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {ctaButton && ctaButton.linkLabel && (
          <div className="btn__cta mt-10 md:mt-16 flex flex-wrap gap-8 items-center justify-center">
            <ButtonPrimary>
              <ResolvedLink link={ctaButton.link}>{ctaButton.linkLabel}</ResolvedLink>
            </ButtonPrimary>
          </div>
        )}
      </div>
    </section>
  );
}
