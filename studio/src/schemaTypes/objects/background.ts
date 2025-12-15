import {defineField, defineType} from 'sanity'
import {UlistIcon} from '@sanity/icons'

export const background = defineType({
  name: 'background',
  title: 'Background',
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
      name: 'backgroundType',
      title: 'Background Type',
      type: 'string',
      options: {
        list: [
          {title: 'Color', value: 'color'},
          {title: 'Image', value: 'image'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'color',
      hidden: ({parent}) => !parent?.enabled,
    }),
    defineField({
      name: 'asset',
      title: 'Background',
      type: 'image',
      hidden: ({parent}) => parent?.backgroundType !== 'image' || !parent?.enabled,
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'Blue', value: 'blue'},
          {title: 'Blue With Graphical Grid', value: 'blueWithGraphic'},
          {title: 'Sand', value: 'sand'},
          {title: 'White', value: 'black'},
          {title: 'Light Blue', value: 'light-blue'},
          {title: 'Accent Brick', value: 'accent-brick'},
          {title: 'Orange', value: 'orange'},
          {title: 'Bright Blue', value: 'bright-blue'},
          {title: 'Gold', value: 'gold'},
          {title: 'Teal Green', value: 'teal-green'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'blue',
      hidden: ({parent}) => parent?.backgroundType !== 'color' || !parent?.enabled,
    }),
    defineField({
      name: 'showBorderTop',
      title: 'Show Border Top',
      type: 'boolean',
      initialValue: false,
      hidden: ({parent}) => !parent?.enabled,
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      options: {
        list: [
          {title: 'Midnight Blue', value: 'blue'},
          {title: 'Black', value: 'black'},
          {title: 'White', value: 'white'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'blue',
      hidden: ({parent}) => !parent?.enabled,
    }),
  ],
  preview: {
    select: {
      backgroundType: 'backgroundType',
    },
    prepare({backgroundType}) {
      return {
        title: `Background - ${backgroundType}`,
      }
    },
  },
})
