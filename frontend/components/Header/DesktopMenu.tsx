'use client';

import { Settings } from '@/sanity.types';
import cn from 'classnames';
import { PopoverGroup } from '@headlessui/react';
import { ButtonPrimary, ResolvedLink } from '@/components';
import NavDropdownSimple from './NavDropdownSimple';
import s from './style.module.css';

export default function DesktopMenu({ settings }: { settings: Settings }) {
  const { globalNav, globalNavCta } = settings;

  if (!globalNav) {
    return null;
  }

  return (
    <div className="desktop-menu menu-wrapper flex-end items-center gap-12 hidden md:flex">
      <div className="flex items-center m-0 gap-3 xl:gap-8 font-normal list-none">
        <PopoverGroup className={cn('hidde md:flex navlinks-desktop', s['navlinks-desktop'])}>
          {globalNav.map((nav) => {
            if (nav.menuItemType === 'default') {
              return (
                <ResolvedLink
                  link={nav.menuLink}
                  className="menu-link hover:text-orange transition duration-400"
                  key={nav._key}
                >
                  <span className="font-bold">{nav.menuLabel}</span>
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
            <ResolvedLink link={globalNavCta.link}>{globalNavCta.linkText}</ResolvedLink>
          </ButtonPrimary>
        </div>
      )}
    </div>
  );
}
