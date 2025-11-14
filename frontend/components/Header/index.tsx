'use client';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { Settings } from '@/sanity.types';
import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';
import s from './style.module.css';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './DesktopMenu';
import LogoBlack from '@/assets/images/LogoBlack.png';
import { HelpDeskIcon, ProfileIcon } from '@/components/Icons';

// @ts-ignore: temporary disable typecheck for now
export default function Header({ settings }: { settings: Settings }) {
  const { globalNav } = settings;
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const header = document.querySelector('.site-header');

    if (latest > 100) {
      header?.classList.add('has-scrolled');
    } else {
      header?.classList.remove('has-scrolled');
    }
  });

  if (!settings || !globalNav) {
    return null;
  }

  return (
    <>
      <header className={cn(s['header'], 'border-lightest-gray border-b', 'site-header')}>
        <div className="bg-blue text-white">
          <div className="container">
            <div className="flex justify-between items-center relative h-[52px] ">
              <div className="site-announcement">
                <p>NEW! BetterComp secures $33M in Series A funding.</p>
              </div>
              <div className="quick-actions flex items-center gap-8">
                <div className="link-with-icon">
                  <a href="#" className="flex items-center gap-4">
                    <span>Help</span>
                    <span>
                      <HelpDeskIcon />
                    </span>
                  </a>
                </div>
                <div className="link-with-icon">
                  <a href="#" className="flex items-center gap-4">
                    <span>Login</span>
                    <span>
                      <ProfileIcon />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container py-8">
          <div className="flex items-center justify-between gap-16 relative">
            <Link href="/">
              <Image src={LogoBlack} alt="Logo BetterComp" width={304} height={56} />
              <div className="logo">
                <span className="sr-only">BetterComp Logo</span>
              </div>
            </Link>
            <DesktopMenu settings={settings} />
          </div>
        </div>
        <div className="md:hidden">
          <MobileMenu settings={settings} />
        </div>
      </header>
      <div className={cn(s['spacer'], 'spacer')} />
    </>
  );
}
