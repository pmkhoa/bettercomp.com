export const redirects = [
  {
    source: '/blog',
    destination: '/resources?contentType=blog',
    permanent: true,
  },
  {
    source: '/blog/page/:page',
    destination: '/resources?contentType=blog',
    permanent: true,
  },
  {
    source: '/blog/tag/:tag',
    destination: `/resources?topic=:tag`,
    permanent: true,
  },
  {
    source: '/blog/tag/:tag/page/:page',
    destination: `/resources?topic=:tag`,
    permanent: true,
  },
  {
    source: '/blog/author/:slug',
    destination: '/author/:slug',
    permanent: true,
  },
  {
    source: '/blog/author/:slug/page/:page',
    destination: '/author/:slug',
    permanent: true,
  },
  {
    source: '/business-mindset-guide',
    destination: '/guide/business-mindset-guide',
    permanent: true,
  },
  {
    source: '/compensation-glossary',
    destination: '/guide/compensation-glossary',
    permanent: true,
  },
  {
    source: '/company',
    destination: '/about-us',
    permanent: true,
  },
];
