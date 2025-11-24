'use client';

import { usePathname } from 'next/navigation';
import { useState, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Settings } from '@/sanity.types';
import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';
import s from './style.module.css';
import LogoBlack from '@/assets/images/LogoBlack.png';
import LogoWhite from '@/assets/images/LogoWhite.png';
import { HelpDeskIcon, ProfileIcon } from '@/components/Icons';
import { PopoverGroup } from '@headlessui/react';
import { ButtonPrimary, ResolvedLink } from '@/components';
import NavDropdownSimple from './NavDropdownSimple';

export default function Header({ settings }: { settings: Settings }) {
  const { globalNav, globalNavCta } = settings;
  const { scrollY } = useScroll();

  const pathname = usePathname();

  const [navTheme, setNavTheme] = useState<{
    headerBg: string;
    topbarBg: string;
    topbarText: string;
    navLinksText: string;
    dropdownBg: string;
    dropdownText: string;
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
      });
    } else {
      setNavTheme({
        headerBg: 'bg-blue',
        topbarBg: 'bg-midnight-blue-darker',
        topbarText: 'text-white',
        navLinksText: 'text-white',
        dropdownBg: 'bg-white',
        dropdownText: 'text-blue',
        logo: LogoWhite,
      });
    }
  }, [pathname]);

  if (!navTheme) return null; // Prevent render until theme resolved

  return (
    <>
      {/* ===== HEADER ===== */}
      <motion.header
        style={{
          height: headerHeight,
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 26 }}
        className={cn(
          'border-gray-200 border-b site-header fixed z-50 inset-0 overflow-visible',
          navTheme.headerBg,
          navTheme.topbarText,
        )}
      >
        {/* TOP BAR */}
        <div className={cn(navTheme.topbarBg, navTheme.topbarText, 'nav-topbar')}>
          <div className="container">
            <div className="flex justify-between items-center relative h-[52px] ">
              <div className="site-announcement">
                <p>NEW! BetterComp secures $33M in Series A funding.</p>
              </div>

              <div className="quick-actions flex items-center gap-8">
                <div className="link-with-icon">
                  <a href="#" className="flex items-center gap-4">
                    <span>Help</span>
                    <HelpDeskIcon />
                  </a>
                </div>
                <div className="link-with-icon">
                  <a href="#" className="flex items-center gap-4">
                    <span>Login</span>
                    <ProfileIcon />
                  </a>
                </div>
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
            <div className="desktop-menu menu-wrapper flex-end items-center gap-12 hidden md:flex">
              <div className="flex items-center m-0 gap-3 xl:gap-8 font-normal list-none">
                <PopoverGroup
                  className={cn(
                    'hidden md:flex navlinks-desktop',
                    s['navlinks-desktop'],
                    navTheme.navLinksText,
                  )}
                >
                  {globalNav.map((nav) => {
                    if (nav.menuItemType === 'default') {
                      return (
                        <ResolvedLink
                          link={nav.menuLink}
                          className={cn(
                            'menu-link transition duration-400 font-bold hover:text-orange',
                            navTheme.navLinksText,
                          )}
                          key={nav._key}
                        >
                          {nav.menuLabel}
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
              {globalNavCta && (
                <div className="cta-wrapper">
                  <ButtonPrimary>
                    <ResolvedLink link={globalNavCta.link}>
                      {globalNavCta.linkText}
                    </ResolvedLink>
                  </ButtonPrimary>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* MOBILE NAV */}
      </motion.header>

      {/* ===== SPACER (same background as header) ===== */}
      <div className={cn('spacer h-24 lg:h-[172px]', navTheme.headerBg)} />
    </>
  );
}
