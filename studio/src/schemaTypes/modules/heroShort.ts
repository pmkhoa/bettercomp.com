import { defineField, defineType } from 'sanity';
import { UlistIcon } from '@sanity/icons';

export const heroShort = defineType({
  name: 'heroShort',
  title: 'Hero Short',
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
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'mediaAsset',
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
        title,
        subtitle: 'Hero Short',
      };
    },
  },
});
