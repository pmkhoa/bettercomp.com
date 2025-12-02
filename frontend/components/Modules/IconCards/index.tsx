import { SanityImage, ButtonPrimary, PortableText, MediaAsset, ResolvedLink } from '@/components';
import cn from 'classnames';
import Image from 'next/image';
import { IconCards } from '@/sanity.types';
import { defaultBackground } from '@/utils/constants';
import iconCardsBg from '@/assets/images/iconcards-bg.png';

export default function IconCardsModule({ block }: { block: IconCards }) {
  if (!block.enabled) return null;
  const { heading, description, ctaButton, listItem, layout } = block;

  return (
    <section className={cn('section-module relative', 'icon-cards bg-blue py-24')}>
      <div className="bg-top  w-full h-[50%] absolute top-0 left-0 z-10">
        <Image
          src={iconCardsBg}
          alt="Background"
          className="absolute inset-0 object-cover w-full h-full"
        />
      </div>
      <div className="container z-20 relative">
        <div className="flex justify-center items-center text-center mb-8 pb-8">
          <div className="description max-w-3xl text-white">
            {heading && (
              <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4">{heading}</h2>
            )}
            {description && <PortableText value={description} />}
          </div>
        </div>

        <div className="grid-container gap-12">
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
                    'content-wrapper gap-4 bg-white shadow-md',
                    layout === 'two' && 'p-12',
                    layout === 'three' && 'p-8'
                  )}
                >
                  {content?.image && (
                    <div className="relative mb-8">
                      <SanityImage image={content.image} className="w-[40px] h-auto" />
                    </div>
                  )}
                  <div className="inner-content mb-4">
                    {content.title && (
                      <p className="font-bold font-serif text-green">{content.title}</p>
                    )}
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

        <div className="btn__cta mt-16 flex flex-wrap gap-8 items-center justify-center">
          {ctaButton && ctaButton.linkLabel && (
            <ButtonPrimary>
              <ResolvedLink link={ctaButton.link}>{ctaButton.linkLabel}</ResolvedLink>
            </ButtonPrimary>
          )}
        </div>
      </div>
    </section>
  );
}
