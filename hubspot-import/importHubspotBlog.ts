/**
 * importHubspotBlogs.ts
 *
 * Usage:
 *   npx ts-node scripts/importHubspotBlogs.ts
 */

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import slugify from 'slugify';
import sanityClient from '@sanity/client';
import { htmlToBlocks } from '@portabletext/block-tools';
import { JSDOM } from 'jsdom';
import { v4 as uuidv4 } from 'uuid';
import fetch from 'node-fetch';

// IMPORTANT — update this path to match your project:
import { blockContent } from '../studio/src/schemaTypes/objects/blockContent.ts';

const client = sanityClient({
  projectId: 'mkcq8qmf', // <- replace
  dataset: 'production',
  apiVersion: '2024-03-01',
  token:
    'sk7SRyUlvTdi3e29v5abEWCkmH8QQTqKyXoSepMX65hnpJoSgLghX9Ybl6yrytCREmcNewuvNb7zdztXjN37JIyKH4Fwu3sktVxbLwukIaKc1VkHPH7U7sqLyiceHG4Xr4c33qDIS8bhi8hgxkhIdfICFIyuj5HOnZZHWPFxxN9DYYScbhPq',
  useCdn: false,
});

// Path to your uploaded HubSpot CSV
const CSV_PATH = './hubspot-blog-export-empty-2025-11-18.csv';

/* -------------------------------------------------------
 *  Convert HTML → Portable Text (blockContent)
 * ----------------------------------------------------- */
async function convertHtmlToPortableText(html: string) {
  try {
    if (!html) return [];
    const dom = new JSDOM(html);
    const { document } = dom.window;

    const blocks = htmlToBlocks(document.body, blockContent);
    return blocks;
  } catch (err) {
    console.warn('⚠️ HTML → Portable Text conversion failed. Using empty content.', err);
    return [];
  }
}

/* -------------------------------------------------------
 *  Compute estimated reading time (in minutes, as string)
 *  Based on ~200 words per minute
 * ----------------------------------------------------- */
function computeEstimatedReadingTime(html: string): string | null {
  if (!html) return null;

  try {
    const dom = new JSDOM(html);
    const text = dom.window.document.body.textContent || '';
    const words = text.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length;

    if (!words || words === 0) return null;

    const minutes = Math.max(1, Math.round(words / 200));
    return String(minutes); // article schema expects string
  } catch (err) {
    console.warn('⚠️ Failed to compute reading time:', err);
    return null;
  }
}

/* -------------------------------------------------------
 *  STRICT cover image upload: must succeed or article is skipped
 * ----------------------------------------------------- */
async function uploadCoverImageStrict(imageUrl: string) {
  if (!imageUrl || !imageUrl.trim()) {
    throw new Error('Missing Featured image URL');
  }

  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Image fetch failed with status ${response.status}`);
    }

    // node-fetch v3: use arrayBuffer()
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const asset = await client.assets.upload('image', buffer, {
      filename: path.basename(imageUrl),
    });

    if (!asset?._id) throw new Error('Asset upload returned no _id');

    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (err: any) {
    throw new Error(`Cover image upload FAILED: ${imageUrl} → ${err.message}`);
  }
}

/* -------------------------------------------------------
 *  Tag helper (safe)
 * ----------------------------------------------------- */
async function safeTag(tagName: string) {
  try {
    if (!tagName) return null;

    const existing = await client.fetch(`*[_type == "tag" && name == $name][0]`, {
      name: tagName,
    });
    if (existing) return existing._id;

    const created = await client.create({
      _type: 'tag',
      name: tagName,
    });

    return created._id;
  } catch (err) {
    console.warn('⚠️ Tag failed:', tagName, err);
    return null;
  }
}

/* -------------------------------------------------------
 *  Author helper (safe)
 * ----------------------------------------------------- */
async function safeAuthor(fullName: string) {
  try {
    if (!fullName) return null;

    const parts = fullName.trim().split(' ');
    const firstName = parts.shift() || '';
    const lastName = parts.join(' ');

    const existing = await client.fetch(
      `*[_type == "author" && firstName == $first && lastName == $last][0]`,
      { first: firstName, last: lastName },
    );

    if (existing) return existing._id;

    const created = await client.create({
      _type: 'author',
      firstName,
      lastName,
    });

    return created._id;
  } catch (err) {
    console.warn('⚠️ Author failed:', fullName, err);
    return null;
  }
}

/* -------------------------------------------------------
 *  MAIN IMPORT
 * ----------------------------------------------------- */
async function importCSV() {
  const buffer = fs.readFileSync(CSV_PATH);
  const rows = parse(buffer, { columns: true, skip_empty_lines: true });

  console.log(`📄 Found ${rows.length} blog posts in CSV`);

  for (const row of rows as any[]) {
    try {
      // --- REQUIRED: TITLE ---
      const rawTitle = row['Post title']?.trim();
      if (!rawTitle) {
        console.warn('⚠️ Skipping row — Post title missing');
        continue;
      }

      const title = rawTitle;

      // Slug (with fallback)
      let slug = slugify(title, { strict: true, lower: true }).trim();
      if (!slug) slug = `post-${Date.now()}`;

      // UUID-based _id
      const documentId = `${uuidv4()}`;

      const htmlContent = row['Post Body'] || '';

      // Portable Text from HTML
      const pageBuilder = await convertHtmlToPortableText(htmlContent);

      // Estimated reading time
      const estimatedReadingTime = computeEstimatedReadingTime(htmlContent);

      // Publish date
      // DATE — use Last Modified Date as published date
      const publishDate = row['Last modified date']
        ? new Date(row['Last modified date']).toISOString()
        : new Date().toISOString();

      // Tags
      const tagList = row['Tag list']?.split(';').map((t: string) => t.trim()) || [];
      const tagRefs: any[] = [];

      for (const t of tagList) {
        const id = await safeTag(t);
        if (id) tagRefs.push({ _type: 'reference', _ref: id });
      }

      // Author
      const authorId = await safeAuthor(row['Author full name']);

      // STRICT cover image
      const coverImageUrl = row['Featured image URL'] || '';
      const coverImage = await uploadCoverImageStrict(coverImageUrl);

      // SEO / meta
      const metaDescription = row['Meta description'] || row['Post Summary'] || '';

      // Build Article doc
      const articleDoc = {
        _type: 'article',
        _id: documentId,
        title,
        slug: { current: slug },
        excerpt: metaDescription,
        mainNavBackground: 'blue',
        coverImage, // required, enforced by uploadCoverImageStrict
        date: publishDate,
        estimatedReadingTime: estimatedReadingTime, // string or null
        useNarrowWidthContent: true, // 🔹 as requested
        tags: tagRefs,
        author: authorId ? { _type: 'reference', _ref: authorId } : undefined,
        pageBuilder,
        seo: {
          title,
          description: metaDescription,
          ogImage: coverImage,
        },
      };

      await client.createOrReplace(articleDoc);

      console.log(`✅ Imported: ${title}`);
    } catch (err: any) {
      console.error(`❌ Skipping article — ${err.message}`);
    }
  }

  console.log('🎉 Import complete!');
}

importCSV();
