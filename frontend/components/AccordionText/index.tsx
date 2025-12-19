'use client';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { get, kebabCase } from 'lodash';

import { PortableText, ResolvedLink } from '@/components';

import s from './style.module.css';

/*
 * Props for `AccordionText`.
 */
type AccordionProps = {
  title?: string;
  description?: any;
  ctaText?: string;
  ctaLink?: any;
  accordionList: any;
};

const AccordionTextModule = ({ accordionList = [] }: AccordionProps) => {
  const hideOtherDisclosuresHandle = (_id: string) => {
    const buttons = document.querySelectorAll('button[data-headlessui-state="open"]');
    buttons.forEach((button) => {
      if (button?.id !== _id) {
        // @ts-expect-error: disable this
        button?.click();
      }
    });
  };

  return (
    <section className={cn('section-accordion-text')}>
      <div className="accordion-text-wrapper">
        <div className="accordion-container my-4">
          {accordionList.map((item: any, index: number) => {
            const label = get(item, 'title');
            const { ctaButton, content } = item;

            return (
              <div className={cn(s['accordion-item'], 'py-4 md:py-6 px-3')} key={index}>
                <Disclosure as="div" className="w-full">
                  {({ open }) => (
                    <>
                      <DisclosureButton
                        id={kebabCase(`${label}-${index}`)}
                        className={cn(s['label'], `is-open-${open}`)}
                        onClick={() => hideOtherDisclosuresHandle(kebabCase(`${label}-${index}`))}
                      >
                        <div className="text-left pr-10 my-0 h5 md:h4">{label}</div>
                      </DisclosureButton>
                      <div className="overflow-hidden pr-10">
                        <AnimatePresence>
                          {open && (
                            <>
                              <DisclosurePanel
                                static
                                as={motion.div}
                                initial="collapsed"
                                animate="open"
                                exit="collapsed"
                                variants={{
                                  open: { opacity: 1, height: 'auto' },
                                  collapsed: { opacity: 0, height: 0 },
                                }}
                                transition={true}
                              >
                                {({ close }) => (
                                  <div className="pt-4 cursor-pointer" onClick={() => close()}>
                                    <PortableText value={content} />
                                    {ctaButton && ctaButton.linkLabel && (
                                      <div className="cta-wrapper mt-6 mb-3">
                                        <ResolvedLink
                                          link={ctaButton.link}
                                          className={'btn-secondary inline-block'}
                                        >
                                          {ctaButton.linkLabel}
                                        </ResolvedLink>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </DisclosurePanel>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    </>
                  )}
                </Disclosure>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AccordionTextModule;
