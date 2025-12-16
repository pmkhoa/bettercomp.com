'use client';

import cn from 'classnames';
import { usePathname } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';

import LogoBlack from '@/assets/images/LogoBlack.png';
import LogoWhite from '@/assets/images/LogoWhite.png';
import { PortableText } from '@/components';
import { Settings } from '@/sanity.types';

import HeaderDesktop from './HeaderDesktop';
import MobileMenu from './MobileMenu';
import s from './style.module.css';

export default function Header({ settings }: { settings: Settings }) {
  const { siteBanner, globalNav } = settings;

  const pathname = usePathname();

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

  // 🎯 No flash: theme decided before paint
  useLayoutEffect(() => {
    const mainNavBg = document.querySelector('.nav-background') as HTMLElement | null;
    const bgColor = mainNavBg?.dataset.bg || 'blue';

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

  if (!settings || !globalNav) return null;
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
      <HeaderDesktop settings={settings} navTheme={navTheme} />

      {/* ===== SPACER (same background as header) ===== */}
      <div className={cn('spacer h-[110px] lg:h-[172px]', navTheme.headerBg)} />
    </>
  );
}
