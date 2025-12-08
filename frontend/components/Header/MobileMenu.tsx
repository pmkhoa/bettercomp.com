'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Settings } from '@/sanity.types';
import Image from 'next/image';
import { useClose, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ResolvedLink } from '@/components';
import DropdownMobile from './DropdownMobile';
import cn from 'classnames';

type MobileMenuProps = {
  settings: Settings;
};

const lockBodyScroll = (lock: boolean) => {
  if (typeof document === 'undefined') return;
  document.body.style.overflow = lock ? 'hidden' : '';
};

const MobileMenuContent = ({
  open,
  settings,
  navTheme,
}: {
  navTheme;
  open: boolean;
  settings: Settings;
}) => {
  const { globalNav, globalNavCta } = settings;

  // Lock/unlock body scroll when menu opens/closes
  useEffect(() => {
    lockBodyScroll(open);
    return () => {
      lockBodyScroll(false);
    };
  }, [open]);

  const close = useClose();

  return (
    <div className="overflow-hidden h-full">
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute top-[72px] left-0 h-screen w-screen bg-sand overflow-auto pb-40 z-40"
          >
            <DisclosurePanel static as="div" className="w-full h-full overflow-auto">
              <div
                role="list"
                className="flex flex-col gap-0 font-normal list-none text-blue overflow-auto"
              >
                {globalNav?.map((nav) => {
                  if (nav.menuItemType === 'default') {
                    return (
                      <ResolvedLink
                        link={nav.menuLink}
                        className={cn(
                          'menu-link transition duration-400 font-bold hover:text-orange',
                          navTheme.navLinksText
                        )}
                        key={nav._key}
                      >
                        <span className="font-bold">{nav.menuLabel}</span>
                      </ResolvedLink>
                    );
                  }

                  if (nav.menuItemType === 'groupLinks') {
                    return (
                      <DropdownMobile
                        nav={nav}
                        key={nav._key}
                        dropdownBg={navTheme.dropdownBg}
                        dropdownText={navTheme.dropdownText}
                        closeMainMenu={close}
                      />
                    );
                  }
                })}
              </div>
            </DisclosurePanel>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileMenu = ({ settings, navTheme }: MobileMenuProps) => {
  return (
    <div className="flex items-center justify-between gap-16 relative h-[72px]">
      <div className="pl-[4%] flex-shrink-0">
        <Link href="/">
          <Image src={navTheme.logo} alt="BetterComp Logo" width={182} height={31} />
          <div className="logo">
            <span className="sr-only">BetterComp Logo</span>
          </div>
        </Link>
      </div>
      <nav className="nav-container-mobile flex justify-between md:hidden">
        <div className="menu-wrapper">
          <Disclosure as="div" className="w-full">
            {({ open }) => (
              <>
                <DisclosureButton
                  className={cn('flex gap-4 items-center mr-4', open && 'is-active')}
                  id="mobile-toggle-icon"
                >
                  <div className="flex flex-col justify-center items-start w-[48px] h-[30px] relative z-50 bg-red p-2">
                    <span
                      className={cn(
                        'absolute w-8 h-[2px] rounded-[2px] transition-transform duration-300',
                        open ? 'rotate-45' : '-translate-y-[10px]',
                        navTheme.mobileMenu
                      )}
                    />
                    <span
                      className={cn(
                        'absolute w-5 h-[2px] rounded-[2px] transition-transform duration-300',
                        open ? 'opacity-0' : '-translate-y-[0px]',
                        navTheme.mobileMenu
                      )}
                    />
                    <span
                      className={cn(
                        'absolute w-8 h-[2px] rounded-[2px] transition-transform duration-300',
                        open ? '-rotate-45' : 'translate-y-[10px]',
                        navTheme.mobileMenu
                      )}
                    />
                  </div>
                </DisclosureButton>

                {/* Animated menu content */}
                <MobileMenuContent open={open} settings={settings} navTheme={navTheme} />
              </>
            )}
          </Disclosure>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
