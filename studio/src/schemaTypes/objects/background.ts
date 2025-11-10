import { defineField, defineType } from 'sanity';
import { UlistIcon } from '@sanity/icons';

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
      initialValue: true,
    }),
    defineField({
      name: 'backgroundType',
      title: 'Background Type',
      type: 'string',
      options: {
        list: [
          { title: 'Color', value: 'color' },
          { title: 'Image', value: 'image' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'asset',
      title: 'Background',
      type: 'mediaAsset',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Mid Night Blue', value: '#002952' },
          { title: 'Orange', value: '#F24E1A' },
          { title: 'Bright Blue', value: '#0092FF' },
          { title: 'Gold', value: '#FFA700' },
          { title: 'Light Blue', value: '#79ECFF' },
          { title: 'Teal Green', value: '#2CB592' },
          { title: 'Accent Brick', value: '#A84C5C' },
          { title: 'Black', value: '#031425' },
          { title: 'White', value: '#ffffff' },
        ],
        layout: 'dropdown',
      },
      initialValue: '#002952', // optional default
    }),
    defineField({
      name: 'showBorderTop',
      title: 'Show Border Top',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      options: {
        list: [
          { title: 'Mid Night Blue', value: '#002952' },
          { title: 'Black', value: '#031425' },
          { title: 'White', value: '#ffffff' },
        ],
        layout: 'dropdown',
      },
      initialValue: '#002952',
    }),
  ],
  preview: {
    select: {
      backgroundType: 'backgroundType',
    },
    prepare({ backgroundType }) {
      return {
        title: `Background - ${backgroundType}`,
      };
    },
  },
});
