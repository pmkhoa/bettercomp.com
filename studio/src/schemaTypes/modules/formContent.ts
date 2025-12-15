import {defineField, defineType} from 'sanity'
import {EqualIcon} from '@sanity/icons'

export const formContent = defineType({
  name: 'formContent',
  title: 'Form Content',
  type: 'object',
  icon: EqualIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'White', value: 'white'},
          {title: 'Sand', value: 'sand'},
        ],
      },
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),

    defineField({
      name: 'contentMaxWidth',
      title: 'Content Max Width',
      type: 'string',
      options: {
        list: [
          {title: 'Full Width', value: 'full'},
          {title: 'Medium', value: 'medium'},
        ],
      },
      initialValue: 'full',
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
      initialValue: 'left',
    }),

    defineField({
      name: 'formContentSection',
      title: 'Form Content',
      type: 'form',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Hubspot Form Section',
      }
    },
  },
})
