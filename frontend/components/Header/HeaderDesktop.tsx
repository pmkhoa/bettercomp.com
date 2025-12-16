'use client';

import { PopoverGroup } from '@headlessui/react';
import cn from 'classnames';
import { delay } from 'lodash';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

import { ButtonPrimary, PortableText, ResolvedLink } from '@/components';
import { CloseIcon, HelpDeskIcon, ProfileIcon, SearchIcon } from '@/components/Icons';
import { Settings } from '@/sanity.types';
import useClickOutside from '@/utils/useClickOutside';

import NavDropdownSimple from './NavDropdownSimple';
import SearchBox from './SearchBox';
import s from './style.module.css';

export default function Header({ settings, navTheme }: { settings: Settings; navTheme: any }) {
  const { siteBanner, loginLink, helpLink, globalNav, globalNavCta } = settings;
  const { scrollY } = useScroll();

  const [searchActive, setSearchActive] = useState(false);

  // 🎯 Smooth shrinking header animation using Framer Motion
  const headerHeight = useTransform(scrollY, [0, 300], ['172px', '124px']);
  const logoScale = useTransform(scrollY, [0, 300], [1, 0.75]);
  const navPadding = useTransform(scrollY, [0, 300], ['2rem', '0.5rem']);

  const ref = useRef<HTMLDivElement | null>(null);
  const hideSearchBox = () => {
    setSearchActive(false);
  };

  useClickOutside(ref, hideSearchBox);

  if (!settings || !globalNav) return null;
  if (!navTheme) return null; // Prevent render until theme resolved

  return (
    <motion.header
      style={{ height: headerHeight }}
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
        <div className="flex items-center justify-between gap-8 xl:gap-16 relative">
          {/* LOGO WITH SCALE ANIMATION */}
          <motion.div
            style={{ scale: logoScale, transformOrigin: 'left center' }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="flex-shrink-0"
          >
            <Link href="/">
              <Image
                src={navTheme.logo}
                alt="BetterComp Logo"
                width={304}
                height={56}
                className="md:w-[220px] md:[h-auto] xl:w-[304px] xl:h-[56px]"
              />
              <div className="logo">
                <span className="sr-only">BetterComp Logo</span>
              </div>
            </Link>
          </motion.div>

          {searchActive ? (
            <div
              className="searchbox-wrapper flex-end items-center gap-8 hidden md:flex w-full"
              ref={ref}
            >
              <div
                className={cn(
                  'flex items-center my-0 gap-3 font-normal list-none w-full justify-end',
                  'xl:gap-8 lg:mr-4'
                )}
              >
                <SearchBox
                  className="bg-white text-blue"
                  iconColor={navTheme.headerBg === 'bg-white' ? '#002952' : '#FFA700'}
                  onSearchSubmit={() => {
                    delay(() => {
                      setSearchActive(false);
                    }, 600);
                  }}
                />
              </div>
              <div className="cta-wrapper">
                <button
                  onClick={() => setSearchActive(false)}
                  className={cn(
                    'flex gap-4 cursor-pointer',
                    navTheme.headerBg === 'bg-white' ? 'text-blue' : 'text-white'
                  )}
                >
                  Close{' '}
                  <CloseIcon color={navTheme.headerBg === 'bg-white' ? '#002952' : '#FFA700'} />
                </button>
              </div>
            </div>
          ) : (
            <div className="desktop-menu menu-wrapper flex-end items-center gap-8 hidden md:flex">
              {/* DESKTOP NAV */}
              <div
                className={cn(
                  'flex items-center my-0 gap-3 font-normal list-none',
                  'xl:gap-8 lg:mr-10 xl:mr-16 2xl:mr-20'
                )}
              >
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
                <SearchIcon color={navTheme.headerBg === 'bg-white' ? '#002952' : '#FFA700'} />
              </button>
              {globalNavCta && globalNavCta.linkText && (
                <div className="cta-wrapper">
                  <ButtonPrimary>
                    <ResolvedLink link={globalNavCta.link}>{globalNavCta.linkText}</ResolvedLink>
                  </ButtonPrimary>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.header>
  );
}
