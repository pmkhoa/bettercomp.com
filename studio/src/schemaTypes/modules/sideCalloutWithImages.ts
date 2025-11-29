import {defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'

export const sideCalloutWithImages = defineType({
  name: 'sideCalloutWithImages',
  title: 'Side Callout With Images',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'subheading',
      title: 'Sub Heading',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'ctaLink',
    }),
    defineField({
      name: 'listItem',
      title: 'List Item',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              fields: [
                defineField({
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                }),
              ],
            }),
            defineField({
              name: 'title',
              title: 'Title',
              hidden: true,
              type: 'string',
              initialValue: 'Item Content',
            }),

            defineField({
              name: 'content',
              title: 'Content',
              type: 'blockContent',
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summaryText',
      title: 'Summary Text',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({title}) {
      return {
        title: title || 'Untitled Resource With Left Panel',
        subtitle: `Resource with left panel`,
      }
    },
  },
})
