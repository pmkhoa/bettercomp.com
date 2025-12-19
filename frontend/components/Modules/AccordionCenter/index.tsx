import cn from 'classnames';

import { AccordionText, ButtonPrimary, PortableText, ResolvedLink } from '@/components';
import { AccordionCenter } from '@/sanity.types';

export default function SectionAccordionCenter({
  block,
  pageData,
}: {
  block: AccordionCenter;
  pageData: any;
}) {
  if (!block.enabled) return null;

  const { subHeading, heading, accordions, description, ctaButton } = block;
  const { showTOC, useNarrowWidthContent } = pageData;

  return (
    <section className={cn('accordion-center', 'section-module my-12 md:my-24')}>
      <div className="container">
        <div className="grid-container gap-0 md:gap-16">
          <div
            className={cn(
              useNarrowWidthContent && !showTOC
                ? 'col-span-12 md:col-span-9'
                : 'col-span-12 md:col-end-11 md:col-start-3'
            )}
          >
            <div className="section-description text-center mb-8 md:mb-16">
              {subHeading && (
                <h6 className="font-serif font-semibold text-green mb-2">{subHeading}</h6>
              )}
              {heading && <h3 className="heading mb-6">{heading}</h3>}
              <PortableText value={description} />
            </div>
            <AccordionText accordionList={accordions} />
            <div className="cta-wrapper mt-8 md:mt-16 flex justify-center">
              {ctaButton && ctaButton.linkLabel && (
                <ButtonPrimary>
                  <ResolvedLink link={ctaButton.link}>{ctaButton.linkLabel}</ResolvedLink>
                </ButtonPrimary>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
