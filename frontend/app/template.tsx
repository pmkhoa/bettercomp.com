'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/all';
import { Fancybox } from '@fancyapps/ui';

gsap.registerPlugin(ScrollToPlugin);

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    Fancybox.bind('[data-fancybox]', {
      Thumbs: false,
      Toolbar: { enabled: false },
      Carousel: { Navigation: true },
    });
  }, []);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      gsap.to(window, { duration: 1, scrollTo: hash, offsetY: 50 });
    } else {
      gsap.to(window, { duration: 0, scrollTo: 0, delay: 0.5 });
    }

    const header = document.querySelector('.site-header');
    const pageContainer = document.querySelector('.page-container');

    // Get all <div> elements under .page-container
    const divs = pageContainer?.querySelectorAll(':scope > div');

    if (divs && divs.length > 0) {
      const firstDiv = divs[0];
      const hasHeroTall = firstDiv.querySelector('section.hero-with-bg') !== null;

      if (hasHeroTall) {
        header?.classList.add('transparent-header');
      } else {
        header?.classList.remove('transparent-header');
      }
    }
  }, [pathname]);

  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.8 }}
      className="main-container"
    >
      {children}
    </motion.div>
  );
}
