import {defineField} from 'sanity'

export const pageBuilder = defineField({
  name: 'pageBuilder',
  title: 'Page builder',
  type: 'array',
  of: [
    {type: 'accordionCenter'},
    {type: 'accordionLeftPanel'},
    {type: 'authorBio'},
    {type: 'allResources'},
    {type: 'contactForm'},
    {type: 'formContent'},
    {type: 'featuredResources'},
    {type: 'fullWidthCTA'},
    {type: 'shortCTA'},
    {type: 'heroCTA'},
    {type: 'heroLarge'},
    {type: 'heroResource'},
    {type: 'heroShort'},
    {type: 'quotation'},
    {type: 'logos'},
    {type: 'iconCards'},
    {type: 'preFooterCTA'},
    {type: 'sideCalloutWithImages'},
    {type: 'richtext'},
    {type: 'stats'},
    {type: 'testimonials'},
    {type: 'threeColumnContentWithIcons'},
    {type: 'threeColumnContentWithNumbers'},
    {type: 'twoColumnsContent'},
    {type: 'twoColumnPhotoCards'},
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
})
