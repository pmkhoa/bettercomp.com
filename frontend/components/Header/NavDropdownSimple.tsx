import { Popover, PopoverPanel, Transition } from '@headlessui/react';
import cn from 'classnames';
import { get } from 'lodash';
import { useRef } from 'react';

import { ResolvedLink } from '@/components';

import PopoverButtonHoverWrapper from './PopoverButtonHoverWrapper';
import s from './style.module.css';

const OPEN_DELAY = 120;
const CLOSE_DELAY = 180;

const NavDropdownSimple = ({
  dropdownText,
  dropdownBg,
  nav,
}: {
  dropdownText: string;
  dropdownBg: string;
  nav: any;
}) => {
  const label = get(nav, 'menuLabel');
  const groupLinks = get(nav, 'groupLinks') || [];

  const buttonRef = useRef<HTMLButtonElement>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  if (!nav) return null;

  return (
    <Popover className="relative">
      {({ open, close }) => {
        const clearTimers = () => {
          if (openTimer.current) {
            clearTimeout(openTimer.current);
            openTimer.current = null;
          }
          if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
          }
        };

        const scheduleOpen = () => {
          clearTimers();
          if (!open) {
            openTimer.current = window.setTimeout(() => {
              buttonRef.current?.click();
            }, OPEN_DELAY);
          }
        };

        const scheduleClose = () => {
          clearTimers();
          if (open) {
            closeTimer.current = window.setTimeout(() => {
              close();
            }, CLOSE_DELAY);
          }
        };

        return (
          <div className="relative" onMouseEnter={scheduleOpen} onMouseLeave={scheduleClose}>
            {/* BUTTON */}
            <PopoverButtonHoverWrapper ref={buttonRef} label={label} showChevron />

            {/* PANEL */}
            <Transition
              show={open}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel
                static
                className={cn(
                  s['popover-panel-simple'],
                  s['popover-panel-center'],
                  'shadow-lg border border-white rounded-sm',
                  dropdownBg,
                  dropdownText
                )}
                onMouseEnter={clearTimers} // ← prevents gap close
                onMouseLeave={scheduleClose} // ← delayed close
              >
                <div className="flex flex-col">
                  {groupLinks.map((subNavLink: any) => (
                    <button onClick={() => close()} className="block w-full">
                      <ResolvedLink
                        key={subNavLink._key}
                        link={subNavLink.menuLink}
                        className="border-b border-white/10 menu-link hover:bg-green py-4 px-4 transition duration-200 text-sm font-medium block text-left"
                      >
                        {subNavLink.menuLabel}
                      </ResolvedLink>
                    </button>
                  ))}
                </div>
              </PopoverPanel>
            </Transition>
          </div>
        );
      }}
    </Popover>
  );
};

export default NavDropdownSimple;
