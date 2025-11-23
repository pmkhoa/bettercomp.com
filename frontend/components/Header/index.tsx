'use client';

import { useState, useLayoutEffect } from 'react';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { Settings } from '@/sanity.types';
import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';
import s from './style.module.css';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './DesktopMenu';
import LogoBlack from '@/assets/images/LogoBlack.png';
import LogoWhite from '@/assets/images/LogoWhite.png';
import { HelpDeskIcon, ProfileIcon } from '@/components/Icons';
import { PopoverGroup } from '@headlessui/react';
import { ButtonPrimary, ResolvedLink } from '@/components';
import NavDropdownSimple from './NavDropdownSimple';

export default function Header({ settings }: { settings: Settings }) {
  const { globalNav, globalNavCta } = settings;
  const { scrollY } = useScroll();

  // Initial theme is null → prevents flash
  const [navTheme, setNavTheme] = useState<{
    headerBg: string;
    topbarBg: string;
    topbarText: string;
    navLinksText: string;
    logo: any;
  } | null>(null);

  if (!settings || !globalNav) return null;

  // ⭐ Scroll behavior stays the same (no flashing)
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const header = document.querySelector('.site-header');
    if (latest > 100) header?.classList.add('has-scrolled');
    else header?.classList.remove('has-scrolled');
  });

  // ⭐ NO FLASH — useLayoutEffect runs BEFORE PAINT
  useLayoutEffect(() => {
    const mainNavBg = document.querySelector('.nav-background') as HTMLElement | null;
    const bgColor = mainNavBg?.dataset.bg || 'white';

    if (bgColor === 'white') {
      setNavTheme({
        headerBg: 'bg-white',
        topbarBg: 'bg-blue',
        topbarText: 'text-white',
        navLinksText: 'text-blue',
        logo: LogoBlack,
      });
    } else {
      setNavTheme({
        headerBg: 'bg-blue',
        topbarBg: 'bg-midnight-blue-darker',
        topbarText: 'text-white',
        navLinksText: 'text-white',
        logo: LogoWhite,
      });
    }
  }, []);

  // ⭐ Avoid flash — render nothing until theme is loaded
  if (!navTheme) return null;

  return (
    <>
      <header
        className={cn(
          'border-lightest-gray border-b site-header fixed z-50 h-24 lg:h-[172px] inset-0',
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
        <div className={cn('container py-8 main-nav nav-main', navTheme.topbarText)}>
          <div className="flex items-center justify-between gap-16 relative">
            <Link href="/" className="block w-[304px] h-[56px]">
              <Image src={navTheme.logo} alt="BetterComp Logo" width={304} height={56} />
              <div className="logo">
                <span className="sr-only">BetterComp Logo</span>
              </div>
            </Link>

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
                      return <NavDropdownSimple nav={nav} key={nav._key} />;
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
        </div>

        {/* MOBILE NAV */}
        <div className="md:hidden">
          <MobileMenu settings={settings} />
        </div>
      </header>

      <div className={cn('spacer h-24 lg:h-[172px]', navTheme.headerBg)} />
    </>
  );
}
