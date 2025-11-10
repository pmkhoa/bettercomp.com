import { defineField, defineType } from 'sanity';
import { InlineElementIcon } from '@sanity/icons';

export const logos = defineType({
  name: 'logos',
  title: 'Logos',
  type: 'object',
  icon: InlineElementIcon,
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
      name: 'useMarqueeEffect',
      title: 'Use Marquee Effect',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'logoGroup',
      title: 'Logo Group',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'compnyLogo',
              title: 'companyLogo',
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
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      logoGroup: 'logoGroup',
    },
    prepare({ logoGroup }) {
      return {
        title: 'Logos Group',
        subtitle: `Total Logos - ${logoGroup?.length}`,
      };
    },
  },
});
