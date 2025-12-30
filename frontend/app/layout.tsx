import './globals.css';

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Zilla_Slab } from 'next/font/google';
import localFont from 'next/font/local';
import { draftMode } from 'next/headers';
import Script from 'next/script';
import { toPlainText } from 'next-sanity';
import { VisualEditing } from 'next-sanity/visual-editing';
import { Toaster } from 'sonner';

import DraftModeToast from '@/components/DraftModeToast';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import * as demo from '@/sanity/lib/demo';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { settingsQuery } from '@/sanity/lib/queries';
import { resolveOpenGraphImage } from '@/sanity/lib/utils';

import { handleError } from './client-utils';

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title || demo.title;
  const description = settings?.description || demo.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  return {
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

const zillaSlab = Zilla_Slab({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // choose what you use
  variable: '--font-zilla-slab', // optional CSS variable
  display: 'swap',
});

const brockmann = localFont({
  src: [
    { path: '../assets/fonts/Brockmann-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../assets/fonts/Brockmann-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../assets/fonts/Brockmann-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../assets/fonts/Brockmann-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-brockmann',
  display: 'swap',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: isDraftMode } = await draftMode();
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  });

  return (
    <html lang="en" className={`${brockmann.variable} ${zillaSlab.variable} bg-white text-black`}>
      <head>
        <link rel="preconnect" href="https://mkcq8qmf.api.sanity.io" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="//mkcq8qmf.api.sanity.io" />
        {settings?.googleTagManager ? (
          <GoogleTagManager gtmId={settings.googleTagManager} />
        ) : (
          <>
            {settings?.googleAnalyticsID && <GoogleAnalytics gaId={settings.googleAnalyticsID} />}
          </>
        )}
      </head>
      <body>
        <section className="min-h-screen">
          {/* The <Toaster> component is responsible for rendering toast notifications used in /app/client-utils.ts and /app/components/DraftModeToast.tsx */}
          <Toaster />
          {isDraftMode && (
            <>
              <DraftModeToast />
              {/*  Enable Visual Editing, only to be rendered when Draft Mode is enabled */}
              <VisualEditing />
            </>
          )}
          {/* The <SanityLive> component is responsible for making all sanityFetch calls in your application live, so should always be rendered. */}
          <SanityLive onError={handleError} />
          {settings && <Header settings={settings as any} />}
          <main className="">{children}</main>
          <Footer settings={settings as any} />
        </section>
        <SpeedInsights />

        <Script id="hs-script-loader" async defer src="//js.hs-scripts.com/21848769.js" />
        <Script id="hs-form-script-loader" async defer src="//js.hsforms.net/forms/embed/v2.js" />
      </body>
    </html>
  );
}
