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
  }, []); // Updates when route changes

  useEffect(() => {
    // @ts-ignore: Ignore init function
    tocbot.init({
      headingsOffset: 420,
      scrollSmoothOffset: -120,
      tocSelector: '.toc-container',
      // Where to grab the headings to build the table of contents.
      contentSelector: '.inner-content',
      // Which headings to grab inside of the contentSelector element.
      headingSelector: 'h1, h2, h3, h4',
      hasInnerContainers: true,
      enableUrlHashUpdateOnScroll: false,
    });

    // @ts-ignore: Ignore init function
    tocbot.refresh();
  }, [pathname]);

  return (
    <>
      <div className="toc-container toc" />
      <div className="social-wrapper flex gap-4 flex-start items-center mt-8">
        <h6 className="text-bright-blue font-bold font-zilla-slab">SHARE</h6>
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
