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
  fieldsets: [
    {
      name: 'header',
      title: 'Header',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: 'footer',
      title: 'Footer',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: 'redirects',
      title: 'Redirects',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your site.',
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
      name: 'googleAnalyticsID',
      title: 'Google Analytics ID',
      type: 'string',
    }),
    defineField({
      name: 'googleTagManager',
      title: 'Google Tag Manager',
      type: 'string',
    }),
    defineField({
      name: 'siteBanner',
      description: 'Top Site Banner',
      title: 'Site Banner',
      type: 'blockContent',
      fieldset: 'header',
    }),
    defineField({
      name: 'loginLink',
      title: 'Login Link',
      type: 'string',
      fieldset: 'header',
    }),
    defineField({
      name: 'helpLink',
      title: 'Help Link',
      type: 'string',
      fieldset: 'header',
    }),
    defineField({
      name: 'globalNav',
      description: 'Entering Global Navigation',
      title: 'Global Navigation',
      type: 'array',
      of: [{ type: 'menuItem' }],
      fieldset: 'header',
    }),
    defineField({
      name: 'globalNavCta',
      title: 'Global Navigation CTA',
      type: 'object',
      fields: [
        defineField({
          name: 'linkText',
          title: 'Link Text',
          type: 'string',
        }),
        defineField({
          name: 'link',
          title: 'Link',
          type: 'link',
        }),
      ],
      fieldset: 'header',
    }),

    defineField({
      name: 'footerCTA',
      fieldset: 'footer',
      description: 'Pre-Footer CTA',
      title: 'Pre Footer CTA',
      type: 'preFooterCTA',
    }),

    defineField({
      name: 'footerNav',
      description: 'Entering Footer Navigation',
      fieldset: 'footer',
      title: 'Footer Navigation',
      type: 'array',
      of: [{ type: 'menuItem' }],
      validation: (Rule) => Rule.max(5),
    }),
    defineField({
      fieldset: 'footer',
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
      fieldset: 'footer',
      name: 'privacyLinks',
      description: 'Entering Extra Links',
      title: 'Privacy Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'menuLabel',
              title: 'Menu Label',
              type: 'string',
            }),
            defineField({
              name: 'menuLink',
              title: 'Menu Link',
              type: 'link',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'redirects',
      title: 'URL Redirects',
      description: 'Manage site-wide redirects (legacy → new URLs)',
      fieldset: 'redirects',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'from',
              title: 'From',
              type: 'string',
              description: 'Example: /blog/tag/business',
              validation: (Rule) =>
                Rule.required().custom((value) =>
                  value?.startsWith('/') ? true : 'Must start with /'
                ),
            }),
            defineField({
              name: 'to',
              title: 'To',
              type: 'string',
              description: 'Example: /resources?topic=business',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'permanent',
              title: 'Permanent (301)',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'enabled',
              title: 'Enabled',
              type: 'boolean',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              from: 'from',
              to: 'to',
              permanent: 'permanent',
            },
            prepare({ from, to, permanent }) {
              return {
                title: `${from} → ${to}`,
                subtitle: permanent ? '301 Permanent' : '302 Temporary',
              };
            },
          },
        }),
      ],
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
