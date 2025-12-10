import { defineField, defineType } from 'sanity';
import { LinkIcon } from '@sanity/icons';

/**
 * Link schema object. This link object lets the user first select the type of link and then
 * then enter the URL, page reference, or post reference - depending on the type selected.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      initialValue: 'page',
      options: {
        list: [
          { title: 'Author', value: 'author' },
          { title: 'URL', value: 'href' },
          { title: 'Page', value: 'page' },
          { title: 'File', value: 'file' },
          { title: 'Blog', value: 'blog' },
          { title: 'Ebook', value: 'ebook' },
          { title: 'Guide', value: 'guide' },
          { title: 'Resource Tool', value: 'tool' },
          { title: 'Resource Template', value: 'template' },
          { title: 'Webinar', value: 'webinar' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'string',
      hidden: ({ parent }) => parent?.linkType !== 'href',
    }),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'reference',
      to: [{ type: 'page' }],
      hidden: ({ parent }) => parent?.linkType !== 'page',
    }),
    defineField({
      name: 'blog',
      title: 'Blog',
      type: 'reference',
      to: [{ type: 'blog' }],
      hidden: ({ parent }) => parent?.linkType !== 'blog',
    }),
    defineField({
      name: 'ebook',
      title: 'Ebook',
      type: 'reference',
      to: [{ type: 'ebook' }],
      hidden: ({ parent }) => parent?.linkType !== 'ebook',
    }),
    defineField({
      name: 'guide',
      title: 'Guide',
      type: 'reference',
      to: [{ type: 'guide' }],
      hidden: ({ parent }) => parent?.linkType !== 'guide',
    }),
    defineField({
      name: 'tool',
      title: 'Resource Tool',
      type: 'reference',
      to: [{ type: 'tool' }],
      hidden: ({ parent }) => parent?.linkType !== 'tool',
    }),
    defineField({
      name: 'template',
      title: 'Resource Template',
      type: 'reference',
      to: [{ type: 'template' }],
      hidden: ({ parent }) => parent?.linkType !== 'template',
    }),
    defineField({
      name: 'webinar',
      title: 'Webinar',
      type: 'reference',
      to: [{ type: 'webinar' }],
      hidden: ({ parent }) => parent?.linkType !== 'webinar',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      hidden: ({ parent }) => parent?.linkType !== 'author',
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});
