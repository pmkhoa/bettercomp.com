import {defineField, defineType} from 'sanity'
import {InlineIcon} from '@sanity/icons'

export const twoColumnPhotoCards = defineType({
  name: 'twoColumnPhotoCards',
  title: 'Two Column Photo Cards',
  type: 'object',
  icon: InlineIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'sectionBackground',
      title: 'Section Background',
      type: 'string',
      options: {
        list: [
          {title: 'Sand', value: 'sand'},
          {title: 'White', value: 'white'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'white', // optional default
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
              type: 'string',
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'blockContent',
            }),
            defineField({
              name: 'ctaLink',
              title: 'CTA Link',
              type: 'ctaLink',
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(3),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({title}) {
      return {
        title: title,
        subtitle: `Two Column Photo Cards`,
      }
    },
  },
})
