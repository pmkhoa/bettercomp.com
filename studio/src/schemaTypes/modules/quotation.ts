import { defineField, defineType } from 'sanity';
import { TextIcon } from '@sanity/icons';

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
          { title: 'Wide', value: 'wide' },
          { title: 'Narrow', value: 'narrow' },
        ],
      },
      initialValue: 'wide',
    }),
    defineField({
      name: 'textAlign',
      title: 'Text Align',
      type: 'string',
      options: {
        list: [
          { title: 'Center', value: 'center' },
          { title: 'Left', value: 'left' },
        ],
      },
      initialValue: 'center',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
    }),
    defineField({
      name: 'quoteFontWeight',
      title: 'Quote Font Weight',
      type: 'string',
      options: {
        list: [
          { title: 'Medium', value: 'medium' },
          { title: 'Normal', value: 'normal' },
          { title: 'Light', value: 'light' },
        ],
      },
      initialValue: 'medium',
    }),

    defineField({
      name: 'authorInfo',
      title: 'Author Info',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Author Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    defineField({
      name: 'additionalInfo',
      title: 'Additional Info',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'quote',
      sectionId: 'sectionId',
    },
    prepare({ title, sectionId }) {
      return {
        title: title || 'Untitled Info Section',
        subtitle: `Quote - ${sectionId?.current || ''}`,
      };
    },
  },
});
