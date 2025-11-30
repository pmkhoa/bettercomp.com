import {defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'

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
      type: 'blockContent',
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
      name: 'mapLink',
      title: 'Embedded Map Link',
      type: 'string',
    }),
    defineField({
      name: 'mapPhoto',
      title: 'Map Photo',
      type: 'image',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Form Info',
      }
    },
  },
})
