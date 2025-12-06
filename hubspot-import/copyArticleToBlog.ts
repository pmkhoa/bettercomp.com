/**
 * Copy all article documents → blog documents
 *
 * Run:
 *   npx ts-node scripts/copyArticlesToBlogs.ts
 */

import sanityClient from '@sanity/client'
import {v4 as uuid} from 'uuid'

const client = sanityClient({
  projectId: 'mkcq8qmf',
  dataset: 'production',
  apiVersion: '2024-03-01',
  token:
    'skqXxqU5JJWrJzzSSVgF02yR9SOIgXCq7R6XcrgT2uKkw7R3zzy6OjjttU6sv3KOl8WTK22mGv4rAHOtANngkxrYldCGQPuHmnTqxqD6atAoUTSoID2t1lTHHFVeVHbAwN8tvcIkZWnn98cm8os37glfTG2zILSXaYVvaBrROXwxw8nYKoRk',
  useCdn: false,
})

async function copyArticlesToBlogs() {
  console.log('🔍 Fetching all articles...')

  const articles = await client.fetch(`*[_type == "article"]{
		_id,
		title,
		slug,
		mainNavBackground,
		coverImage,
		date,
		estimatedReadingTime,
		showTOC,
		useNarrowWidthContent,
		tags,
		author,
		pageBuilder,
		seo
	}`)

  console.log(`📄 Found ${articles.length} articles.\n`)

  for (const article of articles) {
    try {
      const newId = uuid()

      console.log(`➡️ Creating blog from: ${article.title}`)

      // --- Build blog doc according to resourceBase ---
      const blogDoc = {
        _id: `${newId}`,
        _type: 'blog',

        title: article.title,
        slug: article.slug, // keep same slug
        mainNavBackground: article.mainNavBackground || 'white',

        coverImage: article.coverImage, // REQUIRED (satisfies schema)
        date: article.date || new Date().toISOString(), // REQUIRED

        estimatedReadingTime: article.estimatedReadingTime || '',
        showTOC: article.showTOC || false,
        useNarrowWidthContent: article.useNarrowWidthContent ?? true,

        tags: article.tags || [],

        author: article.author ? {_type: 'reference', _ref: article.author._ref} : undefined,

        pageBuilder: article.pageBuilder || [],

        // --- SEO (required) ---
        seo: {
          title: article.seo?.title || article.title,
          description: article.seo?.description || '',
          ogImage: article.coverImage ? article.coverImage : undefined,
        },
      }

      // --- Create new blog document ---
      await client.create(blogDoc)

      console.log(`✅ Blog created: ${blogDoc._id}\n`)
    } catch (err) {
      console.error(`❌ Failed to migrate article ${article._id}:`, err)
    }
  }

  console.log(`🎉 Migration complete! Review new blog documents in Studio.`)
}

copyArticlesToBlogs().catch((err) => {
  console.error('❌ Script failed:', err)
  process.exit(1)
})
