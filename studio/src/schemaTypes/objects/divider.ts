import { defineType, defineField } from 'sanity';
import { EllipsisHorizontalIcon } from '@sanity/icons';

export const divider = defineType({
  name: 'divider',
  title: 'Divider',
  type: 'object',

  // Required: object must contain at least one field
  fields: [
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Midnight Blue', value: 'blue' },
          { title: 'Orange', value: 'orange' },
          { title: 'Bright Blue', value: 'bright-blue' },
          { title: 'Gold', value: 'gold' },
          { title: 'Light Blue', value: 'light-blue' },
          { title: 'Teal Green', value: 'teal-green' },
          { title: 'Accent Brick', value: 'accent-brick' },
          { title: 'Black', value: 'black' },
          { title: 'White', value: 'black' },
          { title: 'Sand', value: 'sand' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'Sand', // optional default
    }),
  ],

  preview: {
    prepare() {
      return {
        title: '——— Divider ———',
        media: EllipsisHorizontalIcon,
      };
    },
  },
});
