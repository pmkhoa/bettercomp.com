'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as tocbot from 'tocbot';
import { LinkIcon, TwitterIcon, FacebookIcon, LinkedinIcon } from '@/components/Icons';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share';
import './style.css';

const TOC = () => {
  const pathname = usePathname();
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [pathname]);

  useEffect(() => {
    let observer: MutationObserver | null = null;

    const initToc = () => {
      try {
        // @ts-ignore: ignore type
        tocbot.destroy();

        // @ts-ignore: ignore type
        tocbot.init({
          tocSelector: '.toc-container',
          contentSelector: '.inner-content',
          headingSelector: 'h3, h4',
          hasInnerContainers: true,
          scrollSmoothOffset: -120,
          headingsOffset: 420,
          collapseDepth: 5,
          enableUrlHashUpdateOnScroll: false,
        });
      } catch (e) {
        console.warn('TOCBOT INIT ERROR:', e);
      }
    };

    /** 1️⃣ Initialize immediately */

    // @ts-ignore: ignore type
    initToc();

    /** 2️⃣ Observe inner-content for ANY change (e.g., lazy-loaded images shifting layout) */
    const content = document.querySelector('.inner-content');

    if (content) {
      observer = new MutationObserver(() => {
        // Use a small debounce so Tocbot doesn't fire too many times
        clearTimeout((window as any).tocbotTimeout);
        (window as any).tocbotTimeout = setTimeout(() => {
          initToc();
        }, 120);
      });

      observer.observe(content, {
        subtree: true,
        childList: true,
        attributes: true,
      });
    }

    /** 3️⃣ Handle Next.js lazy-loaded images finishing load */
    const images = document.querySelectorAll('.inner-content img');

    images.forEach((img) => {
      img.addEventListener('load', () => {
        initToc();
      });
    });

    /** Cleanup on unmount or route change */
    return () => {
      // @ts-ignore: ignore type
      tocbot.destroy();
      observer?.disconnect();
    };
  }, [pathname]);

  return (
    <>
      <div className="toc-container toc" />
      <div className="social-wrapper flex gap-4 flex-start items-center mt-8">
        <h6 className="text-bright-blue font-semibold font-zilla-slab">SHARE</h6>
        <FacebookShareButton url={currentUrl}>
          <FacebookIcon />
        </FacebookShareButton>
        <LinkedinShareButton url={currentUrl}>
          <LinkedinIcon />
        </LinkedinShareButton>
        <TwitterShareButton url={currentUrl}>
          <TwitterIcon />
        </TwitterShareButton>
        <EmailShareButton url={currentUrl}>
          <LinkIcon />
        </EmailShareButton>
      </div>
    </>
  );
};

export default TOC;
