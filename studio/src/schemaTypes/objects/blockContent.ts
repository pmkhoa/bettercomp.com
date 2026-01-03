import { defineArrayMember, defineType, defineField } from 'sanity';
import {
  EllipsisHorizontalIcon,
  DoubleChevronUpIcon,
  HighlightIcon,
  ColorWheelIcon,
  TextIcon,
  LinkIcon,
  ImageIcon,
} from '@sanity/icons';

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 *
 * Learn more: https://www.sanity.io/docs/block-content
 */

import { CheckmarkIcon, BoldIcon } from '@sanity/icons';

export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',

  of: [
    defineArrayMember(
      {
        type: 'block',
        styles: [
          { title: 'Normal', value: 'normal' },
          { title: 'Heading1', value: 'h1' },
          { title: 'Heading2', value: 'h2' },
          { title: 'Heading3', value: 'h3' },
          { title: 'Heading4', value: 'h4' },
          { title: 'Heading5', value: 'h5' },
          { title: 'Heading6', value: 'h6' },
          { title: 'Small', value: 'small' }, // ⭐ NEW STYLE
          {title: 'Quote', value: 'blockquote'}
        ],
        lists: [
          { title: 'Bullet', value: 'bullet' },
          { title: 'Numbered', value: 'number' },
          { title: 'Checkmarks', value: 'checkmarks', icon: CheckmarkIcon }, // ← NEW LIST TYPE
        ],
        marks: {
          decorators: [
            { title: 'Bold', value: 'strong' }, // Default bold
            { title: 'Italic', value: 'em' }, // Default italic
            { title: 'Underline', value: 'underline' }, // Default underline
            { title: 'Semibold', value: 'semibold', icon: BoldIcon },
            { title: 'Code', value: 'code' }, // Default strike-through
          ],
          annotations: [
            {
              name: 'textColor',
              title: 'Text Color',
              type: 'object',
              icon: ColorWheelIcon,
              fields: [
                {
                  name: 'color',
                  title: 'Color',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Blue', value: '#002952' },
                      { title: 'Green', value: '#2CB592' },
                      { title: 'Orange', value: '#F24E1A' },
                      { title: 'Gold', value: '#FFA700' },
                      { title: 'White', value: '#ffffff' },
                    ],
                  },
                },
              ],
            },
            {
              name: 'fontFamily',
              title: 'Font Family',
              type: 'object',
              icon: TextIcon,
              fields: [
                {
                  name: 'family',
                  title: 'Font',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Sans Serif', value: 'sans' },
                      { title: 'Serif', value: 'serif' },
                    ],
                    layout: 'radio',
                  },
                  initialValue: 'sans',
                },
              ],
            },
            {
              name: 'link',
              type: 'object',
              title: 'Link',
              icon: LinkIcon,
              fields: [
                defineField({
                  name: 'linkType',
                  title: 'Link Type',
                  type: 'string',
                  initialValue: 'url',
                  options: {
                    list: [
                      { title: 'URL', value: 'href' },
                      { title: 'File', value: 'file' },
                      { title: 'Page', value: 'page' },
                      { title: 'Author', value: 'author' },
                      { title: 'Blog', value: 'blog' },
                      { title: 'Ebook', value: 'ebook' },
                      { title: 'Guide', value: 'guide' },
                      { title: 'Tool', value: 'tool' },
                      { title: 'Template', value: 'template' },
                      { title: 'Webinar', value: 'webinar' },
                    ],
                    layout: 'radio',
                  },
                }),
                defineField({
                  name: 'author',
                  title: 'Author',
                  type: 'reference',
                  to: [{ type: 'author' }],
                  hidden: ({ parent }) => parent?.linkType !== 'author',
                }),
                defineField({
                  name: 'href',
                  title: 'URL',
                  type: 'string',
                  hidden: ({ parent }) => parent?.linkType !== 'href',
                }),
                defineField({
                  name: 'pdfFile',
                  title: 'PDF File',
                  type: 'file',
                  options: {
                    accept: 'application/pdf',
                  },
                  hidden: ({ parent }) => parent?.linkType !== 'file',
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
                  title: 'Tool',
                  type: 'reference',
                  to: [{ type: 'tool' }],
                  hidden: ({ parent }) => parent?.linkType !== 'tool',
                }),
                defineField({
                  name: 'template',
                  title: 'Template',
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
                  name: 'page',
                  title: 'Page',
                  type: 'reference',
                  to: [{ type: 'page' }],
                  hidden: ({ parent }) => parent?.linkType !== 'page',
                  validation: (Rule) =>
                    // Custom validation to ensure page reference is provided if the link type is 'page'
                    Rule.custom((value, context: any) => {
                      if (context.parent?.linkType === 'page' && !value) {
                        return 'Page reference is required when Link Type is Page';
                      }
                      return true;
                    }),
                }),
                defineField({
                  name: 'openInNewTab',
                  title: 'Open in new tab',
                  type: 'boolean',
                  initialValue: false,
                }),
              ],
            },
          ],
        },
      },
      {},
    ),
    defineArrayMember({
      type: 'divider',
      title: 'hr',
    }),
    defineArrayMember({
      type: 'htmlEmbed',
      title: 'Embed'
    }),
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
        }),
      ],
    }),
  ],
});
