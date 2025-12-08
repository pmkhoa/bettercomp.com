import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from '@/components/Icons';
import { ResolvedLink } from '@/components';
import { kebabCase } from 'lodash';
import cn from 'classnames';
import s from './style.module.css';

const DropdownMobile = ({
  nav,
  closeMainMenu = () => {},
}: {
  nav: any;
  closeMainMenu: () => void;
}) => {
  const { menuLabel, groupLinks } = nav;

  return (
    <div className="menu-dropdown">
      <Disclosure as="div" className="w-fullflex justify-between  border-b-2 border-gray-200">
        {({ open }) => (
          <>
            <DisclosureButton
              id={kebabCase(`top-level-${menuLabel}`)}
              className={cn(open && s['is-dropdown-open'], 'flex justify-between w-full')}
            >
              <div className="px-4 py-5 flex w-full justify-between items-center text-left">
                <span className="text-lg font-medium">{menuLabel}</span>
                <span>
                  <ChevronDown />
                </span>
              </div>
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
                      transition={true}
                      variants={{
                        open: { opacity: 1, height: 'auto' },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                    >
                      {() => (
                        <div className="px-4">
                          <div className="bg-blue text-white">
                            <div className="flex flex-col">
                              {groupLinks.map((subNavLink: any) => {
                                return (
                                  <ResolvedLink
                                    link={subNavLink.menuLink}
                                    className="border-b-1 border-white/10 menu-link hover:bg-green py-4 px-8 transition duration-400 text-left font-medium"
                                    key={subNavLink._key}
                                  >
                                    <span onClick={() => closeMainMenu()}>
                                      {subNavLink.menuLabel}
                                    </span>
                                  </ResolvedLink>
                                );
                              })}
                            </div>
                          </div>
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
};

export default DropdownMobile;
