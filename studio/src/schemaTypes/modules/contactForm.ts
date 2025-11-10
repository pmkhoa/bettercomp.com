import { defineField, defineType } from 'sanity';
import { TextIcon } from '@sanity/icons';

export const contactForm = defineType({
  name: 'contactForm',
  title: 'Contact Form',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'form',
      title: 'Form',
      type: 'form',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Info',
      type: 'blockContent',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'blockContent',
    }),
    defineField({
      name: 'map',
      title: 'Embedded Map',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Form Info',
      };
    },
  },
});
