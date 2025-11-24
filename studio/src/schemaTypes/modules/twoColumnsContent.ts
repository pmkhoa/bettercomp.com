import { defineField, defineType } from 'sanity';
import { UlistIcon } from '@sanity/icons';

export const twoColumnsContent = defineType({
  name: 'twoColumnsContent',
  title: 'Two Columns Content',
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
      name: 'columnLayout',
      title: 'Column Layout',
      type: 'string',
      options: {
        list: [
          { title: '1/1', value: '1/1' },
          { title: '1/3', value: '1/3' },
          { title: '2/3', value: '2/3' },
        ],
        layout: 'dropdown',
      },
      initialValue: '1/1',
    }),
    defineField({
      name: 'sectionBackground',
      title: 'Section Background',
      type: 'background',
    }),
    defineField({
      name: 'subHeading',
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
      name: 'assetPosition',
      title: 'Media Position',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'asset',
      title: 'Media Asset',
      type: 'mediaAsset',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      assetPosition: 'assetPosition',
    },
    prepare({ title, assetPosition }) {
      return {
        title: title || 'Two Columns Content',
        subtitle: `Media position - ${assetPosition}`,
      };
    },
  },
});
