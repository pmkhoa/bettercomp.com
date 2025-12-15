import { defineField, defineType } from 'sanity';
import { TextIcon } from '@sanity/icons';

export const richtext = defineType({
  name: 'richtext',
  title: 'Richtext',
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
      name: 'richTextType',
      title: 'Richtext Variation',
      type: 'string',
      options: {
        list: [
          { title: 'Default (One Column)', value: 'default' },
          { title: 'With Image', value: 'withImage' },
          { title: 'With Embedded Content', value: 'withEmbedded' },
          { title: 'With Background Video', value: 'withBackgroundVideo' },
        ], // <-- predefined values
      },
      initialValue: 'default',
    }),

    defineField({
      name: 'background',
      title: 'Background',
      type: 'bgColor',
    }),

    defineField({
      name: 'contentMaxWidth',
      title: 'Content Max Width',
      type: 'string',
      options: {
        list: [
          { title: 'Full Width', value: 'full' },
          { title: 'Medium', value: 'medium' },
          { title: 'Narrow', value: 'narrow' },
        ],
      },
      initialValue: 'full',
    }),

    defineField({
      name: 'textAlign',
      title: 'Text Align',
      type: 'string',
      options: {
        list: [
          { title: 'Center', value: 'center' },
          { title: 'Left', value: 'left' },
        ],
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'columnContent',
      title: 'Column Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      hidden: ({ parent }) => parent?.richTextType !== 'withImage',
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
    defineField({
      name: 'embeddedContent',
      title: 'Embedded Content',
      type: 'text',
      hidden: ({ parent }) => parent?.richTextType !== 'withEmbedded',
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'With Background Video',
      type: 'file',
      hidden: ({ parent }) => parent?.richTextType !== 'withBackgroundVideo',
    }),
  ],

  preview: {
    select: {
      columnContent: 'columnContent',
      richTextType: 'richTextType',
      image: 'image',
    },
    prepare({ columnContent, richTextType, image }) {
      return {
        title: `Richtext (${richTextType || 'default'})`,
        subtitle: columnContent?.length ? 'Contains rich text content' : 'No content added',
        media: image,
        columnContent,
        richTextType,
      };
    },
  },
});
