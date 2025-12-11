'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useLayoutEffect } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { Settings } from '@/sanity.types';
import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';
import s from './style.module.css';
import LogoBlack from '@/assets/images/LogoBlack.png';
import LogoWhite from '@/assets/images/LogoWhite.png';
import { SearchIcon, HelpDeskIcon, ProfileIcon } from '@/components/Icons';
import { PopoverGroup } from '@headlessui/react';
import { PortableText, ButtonPrimary, ResolvedLink } from '@/components';
import NavDropdownSimple from './NavDropdownSimple';
import MobileMenu from './MobileMenu';

export default function Header({ settings }: { settings: Settings }) {
  const { siteBanner, loginLink, helpLink, globalNav, globalNavCta } = settings;
  const { scrollY } = useScroll();

  const pathname = usePathname();
  const [searchActive, setSearchActive] = useState(false);

  const [navTheme, setNavTheme] = useState<{
    headerBg: string;
    topbarBg: string;
    topbarText: string;
    navLinksText: string;
    dropdownBg: string;
    dropdownText: string;
    borderBottom: string;
    mobileMenu: string;
    logo: any;
  } | null>(null);

  if (!settings || !globalNav) return null;

  // 🎯 Smooth shrinking header animation using Framer Motion
  const headerHeight = useTransform(scrollY, [0, 300], ['172px', '124px']);
  const logoScale = useTransform(scrollY, [0, 300], [1, 0.75]);
  const navPadding = useTransform(scrollY, [0, 300], ['2rem', '0.5rem']);

  // 🎯 No flash: theme decided before paint
  useLayoutEffect(() => {
    const mainNavBg = document.querySelector('.nav-background') as HTMLElement | null;
    const bgColor = mainNavBg?.dataset.bg || 'white';

    if (bgColor === 'white') {
      setNavTheme({
        headerBg: 'bg-white',
        topbarBg: 'bg-blue',
        topbarText: 'text-white',
        navLinksText: 'text-blue',
        dropdownBg: 'bg-blue',
        dropdownText: 'text-white',
        logo: LogoBlack,
        mobileMenu: 'bg-blue',
        borderBottom: 'border-gray-200',
      });
    } else {
      setNavTheme({
        headerBg: 'bg-blue',
        topbarBg: 'bg-midnight-blue-darker',
        topbarText: 'text-white',
        navLinksText: 'text-white',
        dropdownBg: 'bg-blue',
        dropdownText: 'text-white',
        logo: LogoWhite,
        mobileMenu: 'bg-white',
        borderBottom: 'border-midnight-blue-darker',
      });
    }
  }, [pathname]);

  if (!navTheme) return null; // Prevent render until theme resolved

  return (
    <>
      {/* ===== HEADER: MOBILE ===== */}
      <header
        className={cn(
          'border-gray-200 border-b site-header fixed z-50 inset-0 overflow-visible h-[110px]',
          'md:hidden',
          navTheme.headerBg,
          navTheme.topbarText,
          navTheme.borderBottom
        )}
      >
        {/* TOP BAR: MOBILE */}
        <div className={cn(navTheme.topbarBg, navTheme.topbarText, 'nav-topbar')}>
          <div className="container">
            <div className="flex justify-between items-center relative h-[38px] ">
              <div className={cn('site-announcement text-sm', s['site-banner'])}>
                <PortableText value={siteBanner} />
              </div>
            </div>
          </div>
        </div>
        {/* MAIN NAV */}
        <div className="main-nav nav-main overflow-visible">
          <MobileMenu settings={settings} navTheme={navTheme} />
        </div>
      </header>

      {/* ===== HEADER: DESKTOP ===== */}
      <motion.header
        style={{
          height: headerHeight,
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 26 }}
        className={cn(
          'border-gray-200 border-b site-header fixed z-50 inset-0 overflow-visible',
          'hidden md:block',
          navTheme.headerBg,
          navTheme.topbarText,
          navTheme.borderBottom
        )}
      >
        {/* TOP BAR */}
        <div className={cn(navTheme.topbarBg, navTheme.topbarText, 'nav-topbar')}>
          <div className="container">
            <div className="flex justify-between items-center relative h-[52px] ">
              <div className={cn('site-announcement text-sm', s['site-banner'])}>
                <PortableText value={siteBanner} />
              </div>

              <div className="quick-actions flex items-center gap-8">
                {helpLink && (
                  <div className="link-with-icon">
                    <Link href={helpLink} className="flex items-center gap-4 text-sm">
                      <span>Help</span>
                      <HelpDeskIcon />
                    </Link>
                  </div>
                )}
                {loginLink && (
                  <div className="link-with-icon">
                    <Link href={loginLink} className="flex items-center gap-4 text-sm">
                      <span>Login</span>
                      <ProfileIcon />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MAIN NAV */}
        <motion.div
          className="container main-nav nav-main overflow-visible"
          style={{
            paddingTop: navPadding,
            paddingBottom: navPadding,
          }}
        >
          <div className="flex items-center justify-between gap-16 relative">
            {/* LOGO WITH SCALE ANIMATION */}
            <motion.div
              style={{ scale: logoScale, transformOrigin: 'left center' }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="flex-shrink-0"
            >
              <Link href="/">
                <Image src={navTheme.logo} alt="BetterComp Logo" width={304} height={56} />
                <div className="logo">
                  <span className="sr-only">BetterComp Logo</span>
                </div>
              </Link>
            </motion.div>

            {/* DESKTOP NAV */}
            <div className="desktop-menu menu-wrapper flex-end items-center gap-8 hidden md:flex">
              <div className="flex items-center my-0 gap-3 xl:gap-8 font-normal list-none lg:mr-10 xl:mr-24">
                <PopoverGroup
                  className={cn(
                    'hidden md:flex navlinks-desktop',
                    s['navlinks-desktop'],
                    navTheme.navLinksText
                  )}
                >
                  {globalNav.map((nav) => {
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
                        <NavDropdownSimple
                          nav={nav}
                          key={nav._key}
                          dropdownBg={navTheme.dropdownBg}
                          dropdownText={navTheme.dropdownText}
                        />
                      );
                    }
                  })}
                </PopoverGroup>
              </div>
              <button onClick={() => setSearchActive(true)} className="cursor-pointer">
                <SearchIcon />
              </button>
              {globalNavCta && globalNavCta.linkText && (
                <div className="cta-wrapper">
                  <ButtonPrimary>
                    <ResolvedLink link={globalNavCta.link}>{globalNavCta.linkText}</ResolvedLink>
                  </ButtonPrimary>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* MOBILE NAV */}
      </motion.header>

      {/* ===== SPACER (same background as header) ===== */}
      <div className={cn('spacer h-[110px] lg:h-[172px]', navTheme.headerBg)} />
    </>
  );
}
