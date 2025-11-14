import { AccordionText, PortableText, ResolvedLink } from '@/components';
import cn from 'classnames';
import { AccordionLeftPanel } from '@/sanity.types';

export default function SectionAccordionLeftPanel({ block }: { block: AccordionLeftPanel }) {
  if (!block.enabled) return null;

  const { heading, accordions, description, ctaText, ctaLink } = block;
  return (
    <section className={cn('accordion-simple', 'section-module')}>
      <div className="container">
        <h2 className="heading my-8">{heading}</h2>
        <div className="grid-container gap-0 md:gap-16">
          <div className="col-span-12 md:col-span-5">
            <PortableText value={description} />
            <div className="cta-wrapper my-12">
              {ctaLink && ctaText && (
                <ResolvedLink link={ctaLink} className="button">
                  {ctaText}
                </ResolvedLink>
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
