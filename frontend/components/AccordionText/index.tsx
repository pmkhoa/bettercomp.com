'use client';
import { get, kebabCase } from 'lodash';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'classnames';
import { ResolvedLink, PortableText } from '@/components';
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
        //@ts-ignore: Unreachable code error
        button?.click();
      }
    });
  };

  return (
    <section className={cn('section-accordion-text')}>
      <div className="container">
        <div className="accordion-container my-4">
          {accordionList.map((item: any, index: number) => {
            const label = get(item, 'title');
            const { linkText, link, content } = item;

            return (
              <div
                className={cn(s['accordion-item'], 'border-b border-light-gray py-8 px-3')}
                key={index}
              >
                <Disclosure as="div" className="w-full">
                  {({ open }) => (
                    <>
                      <DisclosureButton
                        id={kebabCase(`${label}-${index}`)}
                        className={cn(s['label'], `is-open-${open}`)}
                        onClick={() =>
                          hideOtherDisclosuresHandle(kebabCase(`${label}-${index}`))
                        }
                      >
                        <h4 className="text-left pr-10">{label}</h4>
                      </DisclosureButton>
                      <div className="overflow-hidden">
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
                                    {linkText && link && (
                                      <ResolvedLink link={link} className={'button mt-6'}>
                                        {linkText}
                                      </ResolvedLink>
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
