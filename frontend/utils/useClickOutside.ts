import React, { useEffect } from 'react';

const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  onClickOutside: () => void
): void => {
  useEffect(() => {
    if (!ref) {
      return;
    }

    const listener = (event: MouseEvent | TouchEvent): void => {
      // Remove preventDefault and stopPropagation for passive event listeners
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      onClickOutside();
    };

    document.addEventListener('mousedown', listener, { passive: true });
    document.addEventListener('touchstart', listener, { passive: true });

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, onClickOutside]);
};

export default useClickOutside;
