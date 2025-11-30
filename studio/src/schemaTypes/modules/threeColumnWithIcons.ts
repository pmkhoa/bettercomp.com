import {defineField, defineType} from 'sanity'
import {InlineIcon} from '@sanity/icons'

export const threeColumnWithIcons = defineType({
  name: 'threeColumnWithIcons',
  title: 'Three Column With Icons or Numbers',
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
              name: 'subheading',
              title: 'Sub Heading',
              type: 'string',
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'blockContent',
            }),
            defineField({
              name: 'ctaButton',
              title: 'CTA Button',
              type: 'ctaLink',
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(2),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({title}) {
      return {
        title: title,
        subtitle: `Three Column With Icons or Numbers`,
      }
    },
  },
})
