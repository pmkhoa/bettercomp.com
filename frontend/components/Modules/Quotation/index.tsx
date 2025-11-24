import cn from 'classnames';
import { Quotation, GetResourceQueryResult } from '@/sanity.types';
import { SanityImage } from '@/components';

type QuotationProps = {
  block: Quotation;
  pageData: any;
};

export default function QuotationModule({ block, pageData }: QuotationProps) {
  const enabled = block.enabled;

  if (!enabled) {
    return null;
  }

  const { layout, quote, authorInfo, image, additionalInfo, textAlign } = block;
  const { showTOC, useNarrowWidthContent } = pageData;

  return (
    <section className={cn('section-quote section-module my-20')}>
      <div className="container">
        <div className="grid-container">
          <div
            className={cn(
              useNarrowWidthContent && !showTOC ? 'col-span-9' : 'col-span-12',
              'relative',
            )}
          >
            <div className="h-2 bg-[linear-gradient(81deg,var(--color-orange)_9.79%,var(--color-gold)_84.97%)] w-[70%] absolute inset-0 z-30 rounded-md overflow-hidden" />
            <div className={cn('flex flex-col py-16 px-20  bg-sand')}>
              <h5 className="mb-8 js-toc-ignore">{quote}</h5>
              <div className="quote-author flex gap-4 items-center">
                {image && image.asset && (
                  <div className="rounded-full w-10 h-10 overflow-hidden">
                    <SanityImage image={image} alt={image.alt} />
                  </div>
                )}
                <div className="flex gap-[3px]">
                  <p className="text-artic block not-italic font-medium">{authorInfo}, </p>
                  <div>{additionalInfo}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
