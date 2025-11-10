import { defineField, defineType } from 'sanity';
import { TextIcon } from '@sanity/icons';

export const form = defineType({
  name: 'form',
  title: 'Form',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'formType',
      title: 'Form Type',
      type: 'string',
      options: {
        list: [
          { title: 'Contact', value: 'contact' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'contact',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formId',
      title: 'Form ID',
      type: 'string',
      hidden: ({ parent }) => parent?.formType !== 'custom',
    }),
    defineField({
      name: 'campaignId',
      title: 'Campaign Id',
      type: 'string',
      hidden: ({ parent }) => parent?.formType !== 'custom',
    }),
  ],
  preview: {
    select: {
      subtitle: 'formType',
    },
    prepare({ subtitle }) {
      return {
        title: 'Hubspot Form',
        subtitle: subtitle,
      };
    },
  },
});
