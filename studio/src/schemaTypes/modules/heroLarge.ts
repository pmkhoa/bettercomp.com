import {defineField, defineType} from 'sanity'
import {UlistIcon} from '@sanity/icons'

export const heroLarge = defineType({
  name: 'heroLarge',
  title: 'Hero Large',
  type: 'object',
  icon: UlistIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'subHeading',
      title: 'Optional Sub Heading',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'mediaAsset',
    }),
    defineField({
      name: 'sectionBackground',
      title: 'Section Background',
      type: 'background',
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'ctaLink',
    }),
    defineField({
      name: 'highlightCustomerPhotos',
      title: 'Highlight Customer Photos',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Hero Large',
      }
    },
  },
})
