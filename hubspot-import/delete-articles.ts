/**
 * Deletes ALL documents of type "article"
 *
 * Run:
 *   npx ts-node-esm sanity-delete-articles.ts
 */

import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'mkcq8qmf',
  dataset: 'production',
  apiVersion: '2024-03-01',
  token:
    'sk7SRyUlvTdi3e29v5abEWCkmH8QQTqKyXoSepMX65hnpJoSgLghX9Ybl6yrytCREmcNewuvNb7zdztXjN37JIyKH4Fwu3sktVxbLwukIaKc1VkHPH7U7sqLyiceHG4Xr4c33qDIS8bhi8hgxkhIdfICFIyuj5HOnZZHWPFxxN9DYYScbhPq',
  useCdn: false,
});

async function deleteAllArticles() {
  const articles = await client.fetch(`*[_type == "article"]{_id}`);

  console.log(`Found ${articles.length} articles to delete…`);
  if (articles.length === 0) return;

  const ids = articles.map((a) => a._id);

  // Delete in a transaction
  const trx = client.transaction();
  ids.forEach((id) => trx.delete(id));

  await trx.commit();

  console.log('✅ All articles deleted.');
}

deleteAllArticles();
