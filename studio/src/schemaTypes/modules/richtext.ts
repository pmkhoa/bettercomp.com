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
      name: 'background',
      title: 'Background',
      type: 'background',
    }),
    defineField({
      name: 'richTextType',
      title: 'Richtext Variation',
      type: 'string',
      options: {
        list: [
          { title: 'Text Only', value: 'default' },
          { title: 'Text with Image', value: 'withImage' },
          { title: 'Text with Embedded Content', value: 'withEmbedded' },
          { title: 'Text with Video', value: 'withVideo' },
        ], // <-- predefined values
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'textAlign',
      title: 'Text Align',
      type: 'string',
      options: {
        list: [
          { title: 'Center', value: 'center' },
          { title: 'Left', value: 'left' },
        ], // <-- predefined values
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'textContent',
      title: 'Text Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
      hidden: ({ parent }) => parent?.richTextType !== 'withImage',
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
      title: 'description',
      subtitle: 'richTextType',
    },
    prepare({ title, subtitle }) {
      return {
        title: 'RichText',
        subtitle: `${subtitle}`,
      };
    },
  },
});
