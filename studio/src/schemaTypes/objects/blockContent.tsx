import { defineArrayMember, defineType, defineField } from 'sanity';
import { DoubleChevronUpIcon, HighlightIcon, LinkIcon, ImageIcon } from '@sanity/icons';

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
export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember(
      {
        type: 'block',
        marks: {
          decorators: [
            { title: 'Bold', value: 'strong' }, // Default bold
            { title: 'Italic', value: 'em' }, // Default italic
            { title: 'Underline', value: 'underline' }, // Default underline
            { title: 'Code', value: 'code' }, // Default strike-through
          ],
          annotations: [
            {
              name: 'textColor',
              title: 'Text Color',
              type: 'object',
              fields: [
                {
                  name: 'color',
                  title: 'Color',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Black', value: '#141414' },
                      { title: 'Red', value: '#EF1F03' },
                      { title: 'Gray', value: '#898989' },
                      { title: 'Light Gray', value: '#cbcbcb' },
                      { title: 'Lightest Gray', value: '#f3f3f3' },
                    ],
                  },
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
                  name: 'pdfFile',
                  title: 'PDF File',
                  type: 'file',
                  options: {
                    accept: 'application/pdf',
                  },
                  hidden: ({ parent }) => parent?.linkType !== 'file',
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
