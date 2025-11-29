import { ButtonPrimary, AccordionText, PortableText, ResolvedLink } from '@/components';
import cn from 'classnames';
import { AccordionCenter } from '@/sanity.types';

export default function SectionAccordionCenter({ block }: { block: AccordionCenter }) {
  if (!block.enabled) return null;

  const { subHeading, heading, accordions, description, ctaButton } = block;
  return (
    <section className={cn('accordion-center', 'section-module my-24')}>
      <div className="container">
        <div className="grid-container gap-0 md:gap-16">
          <div className="col-span-12 md:col-end-11 col-start-3">
            <div className="section-description text-center mb-16">
              {subHeading && (
                <h6 className="font-serif font-semibold text-green mb-2">{subHeading}</h6>
              )}
              {heading && <h3 className="heading mb-6">{heading}</h3>}
              <PortableText value={description} />
            </div>
            <AccordionText accordionList={accordions} />
            <div className="cta-wrapper mt-16 flex justify-center">
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
