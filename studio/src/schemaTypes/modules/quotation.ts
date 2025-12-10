import {defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'

export const quotation = defineType({
  name: 'quotation',
  title: 'Quotation',
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
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {value: 'left', title: 'Left Border'},
          {value: 'top', title: 'Top Border'},
        ],
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'textAlign',
      title: 'Text Align',
      type: 'string',
      options: {
        list: [
          {title: 'Center', value: 'center'},
          {title: 'Left', value: 'left'},
        ],
      },
      initialValue: 'center',
      hidden: ({parent}) => parent?.layout === 'left',
    }),
    defineField({
      name: 'quoteText',
      title: 'Quote Text',
      type: 'blockContent',
      hidden: ({parent}) => parent?.layout === 'top',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      hidden: ({parent}) => parent?.layout === 'left',
    }),
    defineField({
      name: 'quoteFontWeight',
      title: 'Quote Font Weight',
      type: 'string',
      options: {
        list: [
          {title: 'Medium', value: 'medium'},
          {title: 'Normal', value: 'normal'},
          {title: 'Light', value: 'light'},
        ],
      },
      initialValue: 'medium',
      hidden: ({parent}) => parent?.layout === 'left',
    }),

    defineField({
      name: 'authorInfo',
      title: 'Author Info',
      type: 'string',
      hidden: ({parent}) => parent?.layout === 'left',
    }),
    defineField({
      name: 'image',
      title: 'Author Photo',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
      hidden: ({parent}) => parent?.layout === 'left',
    }),
    defineField({
      name: 'additionalInfo',
      title: 'Additional Info',
      type: 'string',
      hidden: ({parent}) => parent?.layout === 'left',
    }),
  ],
  preview: {
    select: {
      title: 'quote',
    },
    prepare({title}) {
      return {
        title: title || 'Quotation Section',
      }
    },
  },
})
