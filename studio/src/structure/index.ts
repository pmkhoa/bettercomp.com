import {HomeIcon, CogIcon, DocumentsIcon} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import pluralize from 'pluralize-esm'

const RESOURCE_TYPES = ['article', 'ebook', 'guide', 'template', 'tool', 'webinar'] // Add more types here

const DISABLED_TYPES = [
  'author',
  'page',
  'blog',
  'home',
  'settings',
  'assist.instruction.context',
  ...RESOURCE_TYPES,
]

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Website Content')
    .items([
      // ----------------------------------------
      // Pages
      // ----------------------------------------
      S.documentTypeListItem('page').title('Pages'),

      // Authors
      S.documentTypeListItem('author').title('Authors'),

      // ----------------------------------------
      // Resources Group (Articles, Ebooks, Case Studies...)
      // ----------------------------------------
      S.listItem()
        .title('Resources')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Resources')
            .items(
              RESOURCE_TYPES.map((type) => S.documentTypeListItem(type).title(pluralize(type))),
            ),
        ),

      // ----------------------------------------
      // Auto-included remaining types
      // (Everything NOT in disabled)
      // ----------------------------------------
      ...S.documentTypeListItems()
        .filter(
          (listItem: any) => ![...DISABLED_TYPES, 'page', 'author'].includes(listItem.getId()),
        )
        .map((listItem) => listItem.title(pluralize(listItem.getTitle() as string))),

      // ----------------------------------------
      // Home Singleton
      // ----------------------------------------
      S.listItem()
        .title('Home')
        .child(S.document().schemaType('home').documentId('home'))
        .icon(HomeIcon),

      // ----------------------------------------
      // Settings Singleton
      // ----------------------------------------
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
    ])
