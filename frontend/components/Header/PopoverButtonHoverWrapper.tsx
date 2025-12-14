import { PopoverButton } from '@headlessui/react';
import cn from 'classnames';
import { forwardRef } from 'react';

import s from './style.module.css';

type Props = {
  label: React.ReactNode;
  showChevron?: boolean;
  onMouseEnter?: () => void;
};

const PopoverButtonHoverWrapper = forwardRef<HTMLButtonElement, Props>(
  ({ label, showChevron = false, onMouseEnter }, ref) => {
    return (
      <PopoverButton
        ref={ref}
        onMouseEnter={onMouseEnter}
        className={cn(
          s['popover-header-button'],
          showChevron && s['show-chevron'],
          showChevron && 'show-chevron',
          'cursor-pointer font-bold popover-btn'
        )}
      >
        {label}
      </PopoverButton>
    );
  }
);

PopoverButtonHoverWrapper.displayName = 'PopoverButtonHoverWrapper';

export default PopoverButtonHoverWrapper;
