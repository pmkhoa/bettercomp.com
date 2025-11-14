import { useEffect, useRef } from 'react';
import { PopoverButton } from '@headlessui/react';
import cn from 'classnames';
import s from './style.module.css';

const PopoverButtonHoverWrapper = ({
  label,
  showChevron = false,
}: {
  label: any;
  showChevron: boolean;
}) => {
  const popoverButtonRef = useRef(null);

  useEffect(() => {
    const current = popoverButtonRef.current;
    if (!current) {
      return;
    }

    const observer = new MutationObserver((mutations) => {
      const hovered = mutations.find(({ attributeName }) => attributeName === 'data-hover');
      // @ts-ignore: temporary disable typecheck for now
      const active = current.hasAttribute('data-active');

      if (hovered && !active) {
        // @ts-ignore: temporary disable typecheck for now
        current.click();
      }
    });

    observer.observe(current, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, [popoverButtonRef]);

  return (
    <PopoverButton
      className={cn(
        s['popover-header-button'],
        showChevron && s['show-chevron'],
        showChevron && 'show-chevron',
        'cursor-pointer font-bold',
        'popover-btn',
      )}
      ref={popoverButtonRef}
    >
      {label}
    </PopoverButton>
  );
};

export default PopoverButtonHoverWrapper;
