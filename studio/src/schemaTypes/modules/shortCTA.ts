import { defineField, defineType } from 'sanity';
import { BulbOutlineIcon } from '@sanity/icons';

/**
 * Call to action schema object.  Objects are reusable schema structures document.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const shortCTA = defineType({
  name: 'shortCTA',
  title: 'Short CTA',
  type: 'object',
  icon: BulbOutlineIcon,
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
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'ctaLink',
    }),
  ],
  preview: {
    prepare(selection) {
      return {
        title: 'Short CTA',
      };
    },
  },
});
