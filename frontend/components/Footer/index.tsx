import { Settings } from '@/sanity.types';
import Link from 'next/link';
import { ButtonPrimary, PortableText, ResolvedLink, SanityImage } from '@/components';

export default function Footer({ settings }: { settings: Settings }) {
  const { footerCTA, footerNav, socialLink, privacyLinks } = settings;

  return (
    <footer className="bg-midnight-blue-darker relative text-white py-1">
      <div className="h-2 bg-[linear-gradient(81deg,var(--color-orange)_9.79%,var(--color-gold)_84.97%)] w-full absolute inset-0 z-10" />
      <div className="container relative">
        <div className="grid-container items-start py-16 md:py-20 gap-y-10">
          <div className="cta-content col-span-12 md:col-span-6">
            {footerCTA?.subheading && (
              <h5 className="text-gold font-semibold font-serif">{footerCTA?.subheading}</h5>
            )}
            <div className="inner-content text-white">
              {footerCTA?.content && <PortableText value={footerCTA?.content} />}
            </div>
            <ButtonPrimary className="mt-4 md:mt-8">
              <ResolvedLink link={footerCTA?.ctaButton?.link}>
                {footerCTA?.ctaButton?.linkLabel}
              </ResolvedLink>
            </ButtonPrimary>
          </div>
          <div className="award-list col-start-1 col-end-13 md:col-start-8 md:col-span-5">
            <div className="flex justify-start flex-col items-end">
              <div className="flex my-4 flex-col">
                <div className="mb-4">
                  <PortableText value={footerCTA?.awardDescription} />
                </div>
                <div className="flex gap-4 justify-around">
                  {footerCTA?.awardLogos?.map((logo) => {
                    if (logo) {
                      return (
                        <div className="w-1/4 md:w-24" key={logo._key}>
                          <SanityImage image={logo} />
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container relative">
        <div className="grid-container footer-links border-t border-sand/20 gap-8 py-10">
          <div className="col-span-12 md:col-span-9 gap-8 md:gap-16 flex flex-wrap">
            {footerNav?.map((footerLinkColumn) => {
              if (footerLinkColumn.groupLinks && footerLinkColumn.groupLinks.length) {
                return (
                  <div
                    className="link-column w-[160px] md:min-w-[160px] md:w-auto"
                    key={footerLinkColumn._key}
                  >
                    <div className="menu-label text-green uppercase my-4 font-bold text-sm">
                      {footerLinkColumn.menuLabel}
                    </div>
                    <div className="flex flex-col">
                      {footerLinkColumn.groupLinks?.map((subNavLink) => {
                        return (
                          <ResolvedLink
                            link={subNavLink.menuLink}
                            className="text-white transition duration-400 hover:underline my-1"
                            key={subNavLink._key}
                          >
                            {subNavLink.menuLabel}
                          </ResolvedLink>
                        );
                      })}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className="col-span-12 md:col-span-3 gap-4 social-links mt-5 flex md:justify-end">
            {socialLink?.map((link) => {
              if (link.socialIcon) {
                return (
                  <Link
                    href={link.url || ''}
                    className="w-8 h-8 relative block local-link"
                    key={link._key}
                  >
                    <SanityImage
                      image={link.socialIcon}
                      className="absolute w-full h-full object-contain inset-0"
                    />
                  </Link>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
      <div className="container relative mb-16 md:mt-10 md:mb-20">
        <div className="grid-container items-center gap-4">
          <div className="col-span-12 md:col-span-4">
            <div className="copyright-info text-sm">
              <small>
                Copyright © BetterComp, {new Date().getFullYear()}. All Rights Reserved.
              </small>
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 flex flex-start gap-4 items-center">
            {privacyLinks?.map((link: any) => {
              return (
                <ResolvedLink link={link.menuLink} key={link._key} className="underline">
                  <small>{link.menuLabel}</small>
                </ResolvedLink>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
