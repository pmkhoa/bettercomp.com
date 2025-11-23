import { defineField, defineType } from 'sanity';
import { NumberIcon } from '@sanity/icons';

export const formContent = defineType({
  name: 'formContent',
  title: 'Form Content',
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
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'formContentSection',
      title: 'Form Content',
      type: 'form',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Hubspot Form Section',
      };
    },
  },
});
