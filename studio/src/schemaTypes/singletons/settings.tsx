import { CogIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

import * as demo from '../../lib/initialValues';

/**
 * Settings schema Singleton.  Singletons are single documents that are displayed not in a collection, handy for things like site settings and other global configurations.
 * Learn more: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
 */

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your blog.',
      title: 'Title',
      type: 'string',
      initialValue: demo.title,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      description: 'Meta description',
      title: 'Description',
      type: 'blockContent',
      initialValue: demo.description,
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
    defineField({
      name: 'footerCTA',
      description: 'Pre-Footer CTA',
      title: 'Pre Footer CTA',
      type: 'preFooterCTA',
    }),
    defineField({
      name: 'globalNav',
      description: 'Entering Global Navigation',
      title: 'Global Navigation',
      type: 'array',
      of: [{ type: 'menuItem' }],
    }),
    defineField({
      name: 'footerNav',
      description: 'Entering Footer Navigation',
      title: 'Footer Navigation',
      type: 'array',
      of: [{ type: 'menuItem' }],
      validation: (Rule) => Rule.max(5),
    }),
    defineField({
      name: 'socialLink',
      title: 'Social Link',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'Url',
              type: 'string',
            }),
            defineField({
              name: 'socialIcon',
              title: 'Social Icon',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'privacyLinks',
      description: 'Entering Extra Links',
      title: 'Privacy Links',
      type: 'array',
      of: [{ type: 'link' }],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      };
    },
  },
});
