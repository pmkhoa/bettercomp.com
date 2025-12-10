import {defineField, defineType} from 'sanity'
import {UlistIcon} from '@sanity/icons'

export const bgColor = defineType({
  name: 'bgColor',
  title: 'bgColor',
  type: 'object',
  icon: UlistIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'Blue', value: 'blue'},
          {title: 'Sand', value: 'sand'},
          {title: 'Light Blue', value: 'light-blue'},
          {title: 'Accent Brick', value: 'accent-brick'},
          {title: 'Orange', value: 'orange'},
          {title: 'Bright Blue', value: 'bright-blue'},
          {title: 'Gold', value: 'gold'},
          {title: 'Teal Green', value: 'teal-green'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'blue', // optional default
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      options: {
        list: [
          {title: 'White', value: 'white'},
          {title: 'Midnight Blue', value: 'blue'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'white',
      hidden: ({parent}) => !parent?.enabled,
    }),
  ],
  preview: {
    select: {
      backgroundColor: 'backgroundColor',
    },
    prepare({backgroundType}) {
      return {
        title: `Background - ${backgroundColor}`,
      }
    },
  },
})
