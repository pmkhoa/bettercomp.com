import { defineField, defineType } from 'sanity';
import { UlistIcon } from '@sanity/icons';

export const heroCTA = defineType({
  name: 'heroCTA',
  title: 'Hero CTA',
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
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'backgroundDesktop',
      title: 'Background Desktop',
      type: 'background',
    }),
    defineField({
      name: 'backgroundMobile',
      title: 'Background Mobile',
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
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: 'Hero CTA',
      };
    },
  },
});
