import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { sanityFetch } from '@/sanity/lib/live';
import { settingsRedirectsQuery } from '@/sanity/lib/queries';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const search = req.nextUrl.search;

  const { data } = await sanityFetch({
    query: settingsRedirectsQuery,
    stega: false,
  });

  const redirects = data.redirects;

  if (!redirects) {
    return NextResponse.next();
  }

  const match = redirects.find(
    (r: any) => r.from === pathname || r.from === `${pathname}${search}`
  );

  if (!match) {
    return NextResponse.next();
  }

  const targetUrl = new URL(match.to, req.url);

  // prevent redirect loops
  if (targetUrl.href === req.nextUrl.href) {
    return NextResponse.next();
  }

  return NextResponse.redirect(targetUrl, match.permanent ? 301 : 302);
}

export const config = {
  matcher: ['/((?!_next|api|static|favicon.ico).*)'],
};
