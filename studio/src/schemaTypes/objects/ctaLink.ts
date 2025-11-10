import { defineField, defineType } from 'sanity';
import { LinkIcon } from '@sanity/icons';

export const ctaLink = defineType({
  name: 'ctaLink',
  title: 'CTA Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'showCtaLink',
      title: 'Show CTA LInk',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'linkLabel',
      title: 'Link Label',
      type: 'string',
      hidden: ({ parent }) => parent?.showCtaLink === false,
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
      hidden: ({ parent }) => parent?.showCtaLink === false,
    }),
  ],
  preview: {
    select: {
      title: 'linkLabel',
    },
    prepare({ title }) {
      return {
        title: title,
      };
    },
  },
});
