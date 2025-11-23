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
      name: 'contentMaxWidth',
      title: 'Content Max Width',
      type: 'string',
      options: {
        list: [
          { title: 'Full Width', value: 'full' },
          { title: 'Medium', value: 'medium' },
          { title: 'Narrow', value: 'narrow' },
        ], // <-- predefined values
      },
      initialValue: 'full',
      hidden: ({ parent }) => {
        return parent?.richTextType === 'twoColumns';
      },
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
      name: 'columnContent',
      title: 'Column Content',
      type: 'blockContent',
      hidden: ({ parent }) => {
        return (
          parent?.richTextType === 'withImage' ||
          parent?.richTextType === 'withEmbedded' ||
          parent?.richTextType === 'withBackgroundVideo'
        );
      },
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
      title: 'description',
      subtitle: 'richTextType',
      image: 'image',
    },
    prepare({ title, image, subtitle }) {
      return {
        title: 'RichText',
        subtitle: `${subtitle}`,
        media: image,
      };
    },
  },
});
