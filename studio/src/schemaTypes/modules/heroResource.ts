import { defineField, defineType } from 'sanity';
import { UlistIcon } from '@sanity/icons';

export const heroResource = defineType({
  name: 'heroResource',
  title: 'Hero Resource',
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
      name: 'resourceType',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          { title: 'eBook', value: 'eBook' },
          { title: 'Guides', value: 'Guides' },
          { title: 'Tool', value: 'Tool' },
          { title: 'Template', value: 'Template' },
          { title: 'Article', value: 'Article' },
          { title: 'Webinar', value: 'Webinar' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'estimatedReadingTime',
      title: 'Estimated Reading Time',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'mediaAsset',
    }),
    defineField({
      name: 'background',
      title: 'Background',
      type: 'background',
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'ctaLink',
    }),
  ],
  preview: {
    select: {
      resourceType: 'resourceType',
    },
    prepare({ resourceType }) {
      return {
        title: 'Hero Resource',
        subtitle: resourceType,
      };
    },
  },
});
