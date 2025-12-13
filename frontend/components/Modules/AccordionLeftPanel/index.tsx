import cn from 'classnames';

import { AccordionText, ButtonPrimary, PortableText, ResolvedLink } from '@/components';
import { AccordionLeftPanel } from '@/sanity.types';

export default function SectionAccordionLeftPanel({ block }: { block: AccordionLeftPanel }) {
  if (!block.enabled) return null;

  const { subHeading, heading, accordions, description, ctaButton } = block;
  return (
    <section className={cn('accordion-simple', 'section-module my-24')}>
      <div className="container">
        <div className="grid-container gap-0 md:gap-16">
          <div className="col-span-12 md:col-span-5">
            {subHeading && (
              <h6 className="font-serif font-semibold text-green mb-2">{subHeading}</h6>
            )}
            {heading && <h3 className="heading mb-6">{heading}</h3>}
            <PortableText value={description} />
            <div className="cta-wrapper mt-8">
              {ctaButton && ctaButton.linkLabel && (
                <ButtonPrimary>
                  <ResolvedLink link={ctaButton.link}>{ctaButton.linkLabel}</ResolvedLink>
                </ButtonPrimary>
              )}
            </div>
          </div>
          <div className="col-span-12 md:col-span-7">
            <AccordionText accordionList={accordions} />
          </div>
        </div>
      </div>
    </section>
  );
}
