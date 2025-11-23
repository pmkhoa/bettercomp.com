import { defineQuery } from 'next-sanity';

const linkReference = /* groq */ `
	_type == "link" => {
		"page": page->slug.current,
		"author": author->slug.current,
		"article": article->slug.current,
		"file": file.asset->url,
	}
`;

const markDefsWithLink = `
	markDefs[] { ..., ${linkReference} }
`;

const linkFields = /* groq */ `
  link { ..., ${linkReference} }
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

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

export const allResourcesQuery = defineQuery(`
	*[_type in ["article", "ebook", "webinar"]] | order(date desc) 
`);

// Search by terms
// Filter by content types
// Search by tags. If there's no tags associated with content types, return true.
export const allResourcesSearchQuery = defineQuery(`
  *[_type in coalesce($types, ["article", "ebook", "webinar"]) && title match $terms && (count(tags[@->name match $topic]) > 0 || !defined(tags) || count(tags) == 0 )] | order(date desc) 
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
      accordions[] { ..., ctaButton { ..., ${linkFields}} } 
    },
    _type == 'accordionLeftPanel' => {
      ..., 
      ctaButton { ..., ${linkFields} }, 
      accordions[] { ..., ctaButton { ..., ${linkFields}} } 
    },
    _type == 'authorBio' => { ..., teamMember-> },
    _type == 'allResources' => { 
      ..., 
      "allResources": ${allResourcesQuery} { ${resourceFields} }, 
      "resources": ${allResourcesSearchQuery} { ${resourceFields} } 
    },
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
