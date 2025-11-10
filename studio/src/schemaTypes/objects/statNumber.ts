import { defineField, defineType } from 'sanity';
import { NumberIcon } from '@sanity/icons';

export const statNumber = defineType({
  name: 'statNumber',
  title: 'Stat Number',
  type: 'object',
  icon: NumberIcon,
  fields: [
    defineField({
      name: 'prefix',
      title: 'Prefix',
      type: 'string',
    }),
    defineField({
      name: 'startNumber',
      title: 'Start Number',
      type: 'string',
    }),
    defineField({
      name: 'endNumber',
      title: 'End Number',
      type: 'string',
    }),
    defineField({
      name: 'increaseStep',
      title: 'Increase Step',
      type: 'string',
    }),
    defineField({
      name: 'suffix',
      title: 'Suffix',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'endNumber',
    },
    prepare({ title }) {
      return {
        title: title,
        subtitle: 'Stats Number',
      };
    },
  },
});
