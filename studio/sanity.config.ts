/**
 * This config is used to configure your Sanity Studio.
 * Learn more: https://www.sanity.io/docs/configuration
 */

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/schemaTypes'
import {structure} from './src/structure'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {
  presentationTool,
  defineDocuments,
  defineLocations,
  type DocumentLocation,
} from 'sanity/presentation'
import {assist} from '@sanity/assist'
import PreviewAction from './src/components/previewAction'

// Environment variables for project configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// URL for preview functionality, defaults to localhost:3000 if not set
const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

const ROUTE_MAP: Record<string, string> = {
	page: '/',
	blog: '/blog',
	article: '/blog', // alias (URL masking)
	ebook: '/ebook',
	guide: '/guide',
	tool: '/tool',
	caseStudy: '/case-study',
	template: '/template',
	news: '/news',
}

// Define the home location for the presentation tool
const homeLocation = {
  title: 'Home',
  href: '/',
} satisfies DocumentLocation

// resolveHref() is a convenience function that resolves the URL
// path for different document types and used in the presentation tool.

function resolveHref(
	documentType?: string,
	slug?: string
): string | undefined {
	if (!documentType) return undefined

	const base = ROUTE_MAP[documentType]

	if (!base) {
		console.warn('[Presentation] Unknown document type:', documentType)
		return undefined
	}

	// Home / singleton pages
	if (documentType === 'page') {
		return slug ? `/${slug}` : '/'
	}

	return slug ? `${base}/${slug}` : base
}

function createLocationResolver() {
  return defineLocations({
    select: {
      title: 'title',
      name: 'name',
      slug: 'slug.current',
      _type: '_type',
    },
    resolve: (doc) => {
      const href = resolveHref(doc?._type, doc?.slug)

      return {
        locations: href
        ? [
          {
            title: doc?.title || doc?.name || 'Untitled',
            href,
          },
        ]
        : [],
      }
    },
  })
}

// Main Sanity configuration
export default defineConfig({
  name: 'default',
  title: 'BetterComp CMS',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure, // Custom studio structure configuration, imported from ./src/structure.ts
    }),
    // Presentation tool configuration for Visual Editing
    presentationTool({
      previewUrl: {
        origin: SANITY_STUDIO_PREVIEW_URL,
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
      allowOrigins: ['http://localhost:*', 'https://bettercomp-com-frontend.vercel.app', 'https://bettercomp.com'],
      resolve: {
        // The Main Document Resolver API provides a method of resolving a main document from a given route or route pattern. https://www.sanity.io/docs/presentation-resolver-api#57720a5678d9

        mainDocuments: defineDocuments([
          {
            route: '/',
            filter: `_type == "settings" && _id == "siteSettings"`,
          },
          {
            route: '/:slug',
            filter: `_type == "page" && slug.current == $slug`,
          },
          {
            route: '/blog/:slug',
            filter: `_type in ["blog", "article"] && slug.current == $slug`,
          },
          {
            route: '/ebook/:slug',
            filter: `_type == "ebook" && slug.current == $slug`,
          },
          {
            route: '/tool/:slug',
            filter: `_type == "tool" && slug.current == $slug`,
          },
          {
            route: '/guide/:slug',
            filter: `_type == "guide" && slug.current == $slug`,
          },
          {
            route: '/case-study/:slug',
            filter: `_type == "caseStudy" && slug.current == $slug`,
          },
          {
            route: '/template/:slug',
            filter: `_type == "template" && slug.current == $slug`,
          },
          {
            route: '/news/:slug',
            filter: `_type == "news" && slug.current == $slug`,
          },
        ]),
        // Locations Resolver API allows you to define where data is being used in your application. https://www.sanity.io/docs/presentation-resolver-api#8d8bca7bfcd7

        locations: {
          settings: defineLocations({
            locations: [homeLocation],
            message: 'This document is used on all pages',
            tone: 'positive',
          }),

          // Generic resolver for all routed content
          page: createLocationResolver(),
          blog: createLocationResolver(),
          article: createLocationResolver(),
          ebook: createLocationResolver(),
          tool: createLocationResolver(),
          caseStudy: createLocationResolver(),
          template: createLocationResolver(),
          news: createLocationResolver(),
        },
      },
    }),
    // Additional plugins for enhanced functionality
    unsplashImageAsset(),
    assist(),
    visionTool(),
  ],

  // Schema configuration, imported from ./src/schemaTypes/index.ts
  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, context) => {
      return context.schemaType === 'news' ||
        context.schemaType === 'blog' ||
        context.schemaType === 'ebook' ||
        context.schemaType === 'guide' ||
        context.schemaType === 'article' ||
        context.schemaType === 'tool' ||
        context.schemaType === 'caseStudy' ||
        context.schemaType === 'template' ||
        context.schemaType === 'page'
        ? [...prev, PreviewAction]
        : prev
    },
  },
})
