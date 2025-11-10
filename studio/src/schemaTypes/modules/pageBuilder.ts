import { defineField } from 'sanity';

export const pageBuilder = defineField({
  name: 'pageBuilder',
  title: 'Page builder',
  type: 'array',
  of: [
    { type: 'accordionCenter' },
    { type: 'accordionLeftPanel' },
    { type: 'contactForm' },
    { type: 'featuredResources' },
    { type: 'fullWidthCTA' },
    { type: 'heroLarge' },
    { type: 'heroResource' },
    { type: 'heroShort' },
    { type: 'iconCards' },
    { type: 'logos' },
    { type: 'preFooterCTA' },
    { type: 'resourcesWithLeftPanel' },
    { type: 'richtext' },
    { type: 'stats' },
    { type: 'testimonials' },
    { type: 'threeColumnContentWithIcons' },
    { type: 'threeColumnContentWithNumbers' },
    { type: 'twoColumnsContent' },
    { type: 'twoColumnPhotoCards' },
  ],
  options: {
    insertMenu: {
      // Configure the "Add Item" menu to display a thumbnail preview of the content type. https://www.sanity.io/docs/array-type#efb1fe03459d
      views: [
        {
          name: 'grid',
          previewImageUrl: (schemaTypeName) =>
            `/static/page-builder-thumbnails/${schemaTypeName}.webp`,
        },
      ],
    },
  },
});
