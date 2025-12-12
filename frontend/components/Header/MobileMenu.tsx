'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Settings } from '@/sanity.types';
import Image from 'next/image';
import { SearchIcon, HelpDeskIcon, ProfileIcon } from '@/components/Icons';
import { useClose, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ButtonPrimary, ResolvedLink } from '@/components';
import DropdownMobile from './DropdownMobile';
import SearchBox from './SearchBox';
import cn from 'classnames';

type MobileMenuProps = {
  settings: Settings;
  navTheme: any;
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
  navTheme: any;
  open: boolean;
  settings: Settings;
}) => {
  const { helpLink, loginLink, globalNav, globalNavCta } = settings;

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
                <div className="p-4 bg-sand   border-b-2 border-gray-200">
                  <SearchBox />
                </div>
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
                    return <DropdownMobile nav={nav} key={nav._key} closeMainMenu={close} />;
                  }
                })}

                {globalNavCta && globalNavCta.linkText && (
                  <div className="cta-wrapper flex justify-center mt-8 mb-4 w-full">
                    <ButtonPrimary>
                      <ResolvedLink link={globalNavCta.link}>{globalNavCta.linkText}</ResolvedLink>
                    </ButtonPrimary>
                  </div>
                )}
                <div className="quick-actions flex items-center gap-8 my-8 mx-8 justify-center">
                  {helpLink && (
                    <div className="link-with-icon">
                      <Link href={helpLink} className="flex items-center gap-2">
                        <span>Help</span>
                        <HelpDeskIcon />
                      </Link>
                    </div>
                  )}
                  {loginLink && (
                    <div className="link-with-icon">
                      <Link href={loginLink} className="flex items-center gap-2">
                        <span>Login</span>
                        <ProfileIcon />
                      </Link>
                    </div>
                  )}
                </div>
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
                  className={cn('flex gap-4 items-center mr-4 sm:mr-6', open && 'is-active')}
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
