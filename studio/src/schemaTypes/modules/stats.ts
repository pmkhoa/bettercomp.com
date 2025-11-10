import { defineField, defineType } from 'sanity';
import { NumberIcon } from '@sanity/icons';

export const stats = defineType({
  name: 'stats',
  title: 'Stats',
  type: 'object',
  icon: NumberIcon,
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
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'ctaLink',
    }),
    defineField({
      name: 'statNumber',
      title: 'Stat Number',
      type: 'array',
      of: [{ type: 'statNumber' }],
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare({ heading }) {
      return {
        title: heading,
        subtitle: `Stats Callout`,
      };
    },
  },
});
