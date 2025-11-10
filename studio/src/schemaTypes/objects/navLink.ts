import { defineField, defineType } from 'sanity';
import { TextIcon } from '@sanity/icons';

export const navLink = defineType({
  name: 'navLink',
  title: 'Nav Link',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    defineField({
      name: 'navLinkTitle',
      title: 'Nav Link Title',
      type: 'string',
    }),
    defineField({
      name: 'navLinkUrl',
      title: 'Nav Link Url',
      type: 'link',
    }),
    defineField({
      name: 'navLinkDescription',
      title: 'Nav Link Description',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'navLinkTitle',
      subtitle: 'navLinkDescription',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled Nav Link',
        subtitle,
      };
    },
  },
});
