import { MasterDetailIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import * as demo from '../../lib/initialValues';

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  icon: MasterDetailIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your blog. Fall back to document title',
      title: 'Title',
      type: 'string',
      initialValue: '',
    }),
    defineField({
      name: 'description',
      title: 'Default description',
      description: 'Used for the <meta> description tag for SEO.',
      type: 'string',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Displayed on social cards and search engine results.',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'ogImage.image',
    },
  },
});
