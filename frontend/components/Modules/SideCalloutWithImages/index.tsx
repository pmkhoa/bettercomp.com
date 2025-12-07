import { ButtonPrimary, PortableText, ResolvedLink, SanityImage } from '@/components';
import cn from 'classnames';
import { SideCalloutWithImages } from '@/sanity.types';

export default function SideCalloutWithImagesModule({ block }: { block: SideCalloutWithImages }) {
  if (!block.enabled) return null;

  const { subheading, heading, listItem, description, ctaButton, summaryText } = block;

  return (
    <section className={cn('side-callout-with-image', 'section-module my-24')}>
      <div className="container">
        <div className="grid-container gap-0 md:gap-16">
          <div className="col-span-12 md:col-span-5">
            {subheading && (
              <h6 className="font-serif font-semibold text-green mb-2">{subheading}</h6>
            )}
            {heading && <h3 className="heading mb-6">{heading}</h3>}
            {description && <PortableText value={description} />}
            <div className="cta-wrapper mt-8">
              {ctaButton && ctaButton.linkLabel && (
                <ButtonPrimary>
                  <ResolvedLink link={ctaButton.link}>{ctaButton.linkLabel}</ResolvedLink>
                </ButtonPrimary>
              )}
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 flex flex-col gap-8">
            {listItem?.map((content) => {
              return (
                <div
                  className="flex gap-8 border-b border-bright-blue pb-8 items-center"
                  key={content._key}
                >
                  <div className="content-image max-w-[200px]">
                    {content.image && (
                      <div className="relative w-full">
                        <SanityImage image={content.image} className="w-full h-auto" />
                      </div>
                    )}
                  </div>
                  <div className="content-wrapper w-full">
                    {content.content && (
                      <div className="text-wrapper">
                        <PortableText value={content.content} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div className="content-summary">
              {summaryText && (
                <div className="text-wrapper">
                  <PortableText value={summaryText} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
