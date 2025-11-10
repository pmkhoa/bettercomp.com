import { defineField, defineType } from 'sanity';
import { TiersIcon } from '@sanity/icons';

export const preFooterCTA = defineType({
  name: 'preFooterCTA',
  title: 'Pre-Footer CTA',
  type: 'object',
  icon: TiersIcon,
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
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'ctaLink',
    }),
    defineField({
      name: 'awardDescription',
      title: 'Award Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'awardLogos',
      title: 'Award Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
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
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      subHeading: 'subHeading',
    },
    prepare({ subHeading }) {
      return {
        title: subHeading,
        subtitle: `Pre-Footer CTA`,
      };
    },
  },
});
