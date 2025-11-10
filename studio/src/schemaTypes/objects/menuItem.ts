import { defineField, defineType } from 'sanity';
import { TextIcon } from '@sanity/icons';

export const menuItem = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'menuItemType',
      title: 'Menu Item Type',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          { title: 'Single Link', value: 'default' },
          { title: 'Group Links', value: 'groupLinks' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'menuLabel',
      title: 'Menu Label',
      type: 'string',
    }),
    defineField({
      name: 'menuLink',
      title: 'Menu Link',
      type: 'link',
      hidden: ({ parent }) => parent?.menuItemType !== 'default',
    }),
    defineField({
      name: 'groupLinks',
      title: 'Group Links',
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
      hidden: ({ parent }) => parent?.menuItemType === 'default',
    }),
  ],
  preview: {
    select: {
      title: 'menuLabel',
      subtitle: 'menuItemType',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled Nav Item',
        subtitle,
      };
    },
  },
});
