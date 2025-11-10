import { defineField, defineType } from 'sanity';
import { TextIcon } from '@sanity/icons';

export const featuredResources = defineType({
  name: 'featuredResources',
  title: 'Feature Resources',
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
      name: 'subheading',
      title: 'Sub Heading',
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
      name: 'resourceDisplayTypes',
      title: 'Resource Display Types',
      type: 'string',
      options: {
        list: [
          { title: 'Most Recents', value: 'mostRecents' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'mostRecents',
    }),
    defineField({
      name: 'selectedResources',
      title: 'Selected Resources',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'page' }, { type: 'blog' }],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Form Info',
      };
    },
  },
});
