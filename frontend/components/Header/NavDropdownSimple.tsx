import { Popover, PopoverPanel, Transition } from '@headlessui/react';
import cn from 'classnames';
import { get } from 'lodash';

import { ResolvedLink } from '@/components';

import PopoverButtonHoverWrapper from './PopoverButtonHoverWrapper';
import s from './style.module.css';

const NavDropdownSimple = ({
  dropdownText,
  dropdownBg,
  nav,
}: {
  dropdownText: string;
  dropdownBg: string;
  nav: any;
}) => {
  if (!nav) {
    return null;
  }

  const label = get(nav, 'menuLabel');
  const groupLinks = get(nav, 'groupLinks') || [];

  return (
    <Popover>
      <PopoverButtonHoverWrapper label={label} showChevron={true} />
      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel
          transition
          className={cn(
            s['popover-panel-simple'],
            s['popover-panel-center'],
            'shadow-lg border-1 border-white rounded-sm',
            dropdownBg,
            dropdownText
          )}
        >
          {({ close }) => (
            <div className="dropdown-wrapper">
              <div className="flex flex-col">
                {groupLinks.map((subNavLink: any) => {
                  return (
                    <ResolvedLink
                      link={subNavLink.menuLink}
                      className="border-b-1 border-white/10 menu-link hover:bg-green py-4 px-8 transition duration-400 text-sm text-left font-medium"
                      key={subNavLink._key}
                    >
                      <span onClick={() => close()}>{subNavLink.menuLabel}</span>
                    </ResolvedLink>
                  );
                })}
              </div>
            </div>
          )}
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};

export default NavDropdownSimple;
