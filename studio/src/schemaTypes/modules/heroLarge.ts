import { defineField, defineType } from 'sanity';
import { UlistIcon } from '@sanity/icons';

export const heroLarge = defineType({
  name: 'heroLarge',
  title: 'Hero Large',
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
    prepare() {
      return {
        title: 'Hero Large',
      };
    },
  },
});
