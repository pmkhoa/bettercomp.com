import {defineField, defineType} from 'sanity'
import {InlineIcon} from '@sanity/icons'

export const iconCards = defineType({
  name: 'iconCards',
  title: 'Icon Cards',
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
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Two Columns', value: 'two'},
          {title: 'Three Columns', value: 'three'},
        ], // <-- predefined values
      },
      initialValue: 'two',
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
        subtitle: `Two Column Icon Cards`,
      }
    },
  },
})
