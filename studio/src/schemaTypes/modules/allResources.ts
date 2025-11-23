import { defineField, defineType } from 'sanity';
import { TextIcon } from '@sanity/icons';

export const allResources = defineType({
  name: 'allResources',
  title: 'All Resources',
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
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'resourceDisplayLayout',
      title: 'Resource Display Layout',
      type: 'string',
      options: {
        list: [
          { title: 'With Large Feature Resources', value: 'withFeatureResources' },
          { title: 'Minimal Grid', value: 'minimalGrid' },
        ],
      },
      initialValue: 'withFeatureResources',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'All Resources',
      };
    },
  },
});
