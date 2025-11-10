import { defineQuery } from 'next-sanity';

const linkReference = /* groq */ `
	_type == "link" => {
		"page": page->slug.current,
		"author": author->slug.current,
		"blog": blog->slug.current,
		"file": file.asset->url,
	}
`;

const markDefsWithLink = `
	markDefs[] { ..., ${linkReference} }
`;

const linkFields = /* groq */ `
  link { ..., ${linkReference} }
`;

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`;

const pageBuilderContent = /* groq */ defineQuery(`
	pageBuilder[] {
		 ...,
    _type == 'accordionCenter' => {
      ..., 
      ctaButton {..., ${linkFields} },
      accordions[] { ..., ctaButton { ..., ${linkFields}} } 
    },
    _type == 'accordionLeftPanel' => {
      ..., 
      ctaButton { ..., ${linkFields} }, 
      accordions[] { ..., ctaButton { ..., ${linkFields}} } 
    },
		_type == 'heroSection' => {..., link {..., ${linkFields} }, secondaryLink { ..., ${linkFields}}},
		_type == 'twoColumnsContentWithImage' => {..., ctaLink { ..., ${linkFields} } },
		_type == 'contentHighlightWithStats' => {..., ctaLink { ..., ${linkFields} } },
		_type == 'twoColumnWithLine' => {..., ctaLink { ..., ${linkFields} } },
		_type == 'iconDescriptions' => {..., columnContent[] { ..., ctaLink { ..., ${linkFields}}}},
		_type == 'statsCallout' => {..., ctaLink{ ..., ${linkFields} }, statsCalloutGlobal -> { ..., ctaLink{ ..., ${linkFields}}}},
		_type == 'accordionWithImage' => {..., accordions[] { ..., link { ..., ${linkFields} }}},
		_type == 'accordionSimple' => {..., ctaLink{ ..., ${linkFields}}},
		_type == 'featuredInsights' => { ..., featuredInsights[]->, "latestArticles": *[_type == "article"] | order(date desc)[0...3] },
		_type == 'preFooterCta' => { ..., },
		_type == 'blogPagination' => { ..., "allBlog": *[_type == "blog"] | order(date asc) { _id, title, slug } },
		_type == 'newsPagination' => { ..., "allNews": *[_type == "news"] | order(date asc) { _id, title, slug } },
		_type == 'articlePagination' => {..., "articles": *[_type == "article"] | order(date asc) { _id, title, slug }},
		_type == 'newsList' => { ..., 
			"allNews": *[_type == "news"],
			"filteredNews": *[_type == "news" && title match $terms && (count(tags[@ match $topic]) > 0 || !defined(tags) || count(tags) == 0 )] | order(date desc)},
		_type == 'sectionCarousel' => { ...,  sectionContent[] { ..., ctaLink{ ..., ${linkFields} } } },
		_type == 'tabsWithContent' => { ...,  tabs[] { ..., ctaLink { ..., ${linkFields} }}},
		_type == 'richtext' => { columnContent[] { ..., ${markDefsWithLink} }, column2Content[] { ..., ${markDefsWithLink}}},
		_type == 'resourceLinks' => { sectionContent[] { ..., content[] { ..., ${markDefsWithLink} }}}
	}

`);

export const getHomeQuery = defineQuery(
  `*[_type == "home"][0] { ..., "pageBuilder": ${pageBuilderContent}}`,
);

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ${linkFields},
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`);

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`);

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`);

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`);

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`);

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);
