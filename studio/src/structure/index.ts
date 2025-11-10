import { HomeIcon, CogIcon } from '@sanity/icons';
import type { StructureBuilder, StructureResolver } from 'sanity/structure';
import pluralize from 'pluralize-esm';

const DISABLED_TYPES = [
  'author',
  'page',
  'blog',
  'home',
  'settings',
  'assist.instruction.context',
];

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Website Content')
    .items([
      // 1️⃣ Custom ordered document types
      S.documentTypeListItem('page').title('Pages'),
      S.documentTypeListItem('blog').title('Blogs'),
      S.documentTypeListItem('author').title('Authors'),

      // 2️⃣ Automatically include remaining types (except disabled + manually added)
      ...S.documentTypeListItems()
        .filter(
          (listItem: any) =>
            ![...DISABLED_TYPES, 'page', 'blog', 'author'].includes(listItem.getId()),
        )
        .map((listItem) => listItem.title(pluralize(listItem.getTitle() as string))),

      // 3️⃣ Singletons
      S.listItem()
        .title('Home')
        .child(S.document().schemaType('home').documentId('home'))
        .icon(HomeIcon),

      S.divider(),

      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
    ]);
