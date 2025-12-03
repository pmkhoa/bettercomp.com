import { defineQuery } from 'next-sanity';

const linkReference = /* groq */ `
	_type == "link" => {
		"page": page->slug.current,
		"author": author->slug.current,
		"article": article->slug.current,
		"ebook": ebook->slug.current,
		"guide": guide->slug.current,
		"webinar": webinar->slug.current,
		"tool": tool->slug.current,
		"template": template->slug.current,
		"file": file.asset->url,
	}
`;

const resourceTypes = `
  ["article", "ebook", "caseStude", "guide", "webinar", "tool", "template"]
`;

const linkFields = /* groq */ `
  link { ..., ${linkReference} }
`;

const markDefsWithLink = `
	markDefs[] { ..., ${linkReference} }
`;

const resourceFields = /* groq */ `
  author-> { authorBio, firstName, lastName, slug, picture, _type, _id},
	coverImage,
	date,
  estimatedReadingTime,
  slug,
  seo,
  tags[]->,
	title,
	_createdAt,
	_id,
	_type,
	_updatedAt,
`;

export const settingsQuery = defineQuery(`*[_type == "settings"][0] {
  ...,
  globalNav[] { 
    ..., 
    menuLink {
      ...,
      ${linkReference}
    },
    groupLinks[] {
      ...,
      menuLink {
        ...,
        ${linkReference}
      },
    }
  }
}`);

export const allResourcesQuery = defineQuery(`
	*[_type in ${resourceTypes} ] | order(date desc) 
`);

export const allResourcesPaginatedQuery = defineQuery(`
	*[
		_type in ${resourceTypes} 
	]
	| order(date desc)
	[$offset...$end]
`);

export const allResourcesSearchPaginatedQuery = defineQuery(`
	*[
		_type in coalesce($types, ${resourceTypes})
		&& title match $terms
		&&
		(
			$topic == "*" 
			|| (
				defined(tags) 
				&& count(tags[@->name match $topic]) > 0
			)
		)
	]
	| order(date desc)
	[$offset...$end]
`);

// Search by terms
// Filter by content types
// Search by tags. If there's no tags associated with content types, return true.
export const allResourcesSearchQuery = defineQuery(`
  *[
		_type in coalesce($types, ${resourceTypes})
		&& title match $terms
		&&
		(
			$topic == "*" 
			|| (
				defined(tags) 
				&& count(tags[@->name match $topic]) > 0
			)
		)
	] | order(date desc)
`);

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
      description[] { ..., ${markDefsWithLink} },
      accordions[] { 
        ..., 
        content[] { ..., ${markDefsWithLink} }, 
        ctaButton { ..., ${linkFields}} 
      } 
    },
    _type == 'accordionLeftPanel' => {
      ..., 
      ctaButton { ..., ${linkFields} }, 
      description[] { ..., ${markDefsWithLink} },
      accordions[] { 
        ..., 
        content[] { ..., ${markDefsWithLink} }, 
        ctaButton { ..., ${linkFields}} 
      } 
    },
    _type == 'authorBio' => { ..., teamMember-> },
    _type == 'allResources' => { 
      ..., 
      "allResources": ${allResourcesQuery} { ${resourceFields} }, 
      "resources": ${allResourcesSearchQuery} { ${resourceFields} } 
    },
    _type == 'featuredResources' => {
      ..., 
      selectedResources[]-> { ${resourceFields} }, 
      "latestResources": *[_type in ${resourceTypes}] { ${resourceFields} } | order(date desc)[0...6] 
    },
    _type == 'formContent' => { 
      ...,  
      description[] { ..., ${markDefsWithLink} },
    },
    _type == 'fullWidthCTA' => { 
      ...,  
      description[] { ..., ${markDefsWithLink} },
      ctaButton {..., ${linkFields} },
    },
    _type == 'heroCta' => { 
      ...,  
      description[] { ..., ${markDefsWithLink} },
      ctaButton {..., ${linkFields} },
    },
    _type == 'heroLarge' => { 
      ...,  
      description[] { ..., ${markDefsWithLink} },
      ctaButton {..., ${linkFields} },
    },
    _type == 'heroResource' => { 
      ...,  
      description[] { ..., ${markDefsWithLink} },
      ctaButton {..., ${linkFields} },
    },
    _type == 'heroShort' => { 
      ...,  
      ctaButton {..., ${linkFields} },
    },
    _type == 'shortCTA' => { 
      ...,  
      description[] { ..., ${markDefsWithLink} },
      ctaButton {..., ${linkFields} },
    },
    _type == 'iconCards' => { 
      ...,  
      description[] { ..., ${markDefsWithLink} },
      ctaButton {..., ${linkFields} },
      listItem [] { 
        ..., 
        content[] { 
          ..., 
          ${markDefsWithLink},
          
        }, 
        ctaLink {..., ${linkFields} }
      },
    },
    _type == 'richtext' => { 
      ...,
      columnContent[] { ..., ${markDefsWithLink} }, 
      column2Content[] { ..., ${markDefsWithLink}},
	  },
    _type == 'threeColumnContentWithIcons' => { 
      ...,
      description[] { ..., ${markDefsWithLink} },
      ctaButton {..., ${linkFields} },
      listItem [] { ..., content[] { ..., ${markDefsWithLink} }, ctaButton {..., ${linkFields} }},
    },
    _type == 'threeColumnContentWithNumbers' => { 
      ...,
      description[] { ..., ${markDefsWithLink} },
      ctaButton {..., ${linkFields} },
      listItem [] { ..., content[] { ..., ${markDefsWithLink} }, ctaButton {..., ${linkFields} }},
	  },
    _type == 'twoColumnPhotoCards' => { 
      ...,
      description[] { ..., ${markDefsWithLink} },
      ctaButton {..., ${linkFields} },
	  },
    _type == 'twoColumnsContent' => { 
      ...,
      description[] { ..., ${markDefsWithLink} },
      ctaButton {..., ${linkFields} },
	  },
    _type == 'sideCalloutWithImages' => { 
      ...,
      ctaButton {..., ${linkFields} },
      description[] { ..., ${markDefsWithLink} },
      summaryText[] { ..., ${markDefsWithLink} }, 
      listItem [] { ..., content[] { ..., ${markDefsWithLink} }},
	  },
    _type == 'testimonials' => { 
      ..., 
      readAllReviews {..., ${linkFields} } 
    },
  }
`);

export const authorQuery = defineQuery(`
	*[_type == "author" && slug.current == $slug][0] {
		...,
		"pageBuilder": ${pageBuilderContent},
		"resources": *[_type  in ${resourceTypes} && author._ref == ^._id] { ${resourceFields} }
	}
`);

export const getRelatedResourcesQuery = defineQuery(`
	*[
		_type == $type &&
		slug.current != $slug &&

		// Match at least 1 tag
		count(tags[@->slug.current in $tagSlugs]) > 0
	]
	| order(date desc)[0...3]{
		title,
		slug,
		coverImage,
		tags[]->{ title, slug },
		date
	}
`);

export const getHomeQuery = defineQuery(
  `*[_type == "home"][0] { ..., "pageBuilder": ${pageBuilderContent}}`
);

export const getPageQuery = defineQuery(`
	*[_type == 'page' && slug.current match $slug][0]{
		...,
		"pageBuilder": ${pageBuilderContent}
	}
`);

// Articles
export const getArticleQuery = defineQuery(`
  *[_type == 'article' && slug.current == $slug][0] {..., author->, tags[]->, "pageBuilder": ${pageBuilderContent}}
`);

export const articleSlugs = defineQuery(`
	*[_type == "article" && defined(slug.current)] {"slug": slug.current}
`);

export const getResourceQuery = defineQuery(`
	*[
		_type == $type &&
		slug.current == $slug
	][0]{
		...,
		author->,
		tags[]->{ title, slug },
		"pageBuilder": ${pageBuilderContent}
	}
`);

export const resourceSlugs = defineQuery(`
	*[
		_type == $type &&
		defined(slug.current)
	]{
		"slug": slug.current
	}
`);

export const getResourcesByTypeQuery = defineQuery(`
	*[
		_type in $types &&
		title match $terms &&
		(
			$topic == "*" ||
			count(tags[@->slug.current == $topic]) > 0
		)
	]
	| order(date desc){
		...,
		tags[]->{ title, slug },
		author->,
		coverImage
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
