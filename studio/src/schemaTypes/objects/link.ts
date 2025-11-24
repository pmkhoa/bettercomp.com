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
          { title: 'Article', value: 'article' },
          { title: 'Ebook', value: 'ebook' },
          { title: 'Case Study', value: 'caseStudy' },
          { title: 'Whitepaper', value: 'whitepaper' },
          { title: 'Blog', value: 'blog' },
        ],
        layout: 'radio',
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
      name: 'article',
      title: 'Article',
      type: 'reference',
      to: [{ type: 'article' }],
      hidden: ({ parent }) => parent?.linkType !== 'article',
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
