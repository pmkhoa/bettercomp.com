import { defineField, defineType } from 'sanity';
import { UlistIcon } from '@sanity/icons';

export const heroResource = defineType({
  name: 'heroResource',
  title: 'Hero Resource',
  type: 'object',
  icon: UlistIcon,
  fieldsets: [
    {
      name: 'resourceHeroInfo',
      title: 'Resource Hero Info',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'useDefaultValue',
      title: 'Use Title and Default Value',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showResourceTypeAndEstimateReading',
      title: 'Show Resource Type and Reading Time',
      type: 'boolean',
      initialValue: false,
      fieldset: 'resourceHeroInfo',
      hidden: ({ parent }) => parent.useDefaultValue,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      fieldset: 'resourceHeroInfo',
      hidden: ({ parent }) => parent.useDefaultValue,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'mediaAsset',
      fieldset: 'resourceHeroInfo',
      hidden: ({ parent }) => parent.useDefaultValue,
    }),
    defineField({
      name: 'sectionBackground',
      title: 'Section Background',
      type: 'background',
      fieldset: 'resourceHeroInfo',
      hidden: ({ parent }) => parent.useDefaultValue,
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'ctaLink',
      fieldset: 'resourceHeroInfo',
      hidden: ({ parent }) => parent.useDefaultValue,
    }),
  ],
  preview: {
    select: {
      useDefaultValue: 'useDefaultValue',
    },
    prepare({ useDefaultValue }) {
      return {
        title: useDefaultValue ? 'Default Resource Hero' : 'Custom Hero',
      };
    },
  },
});
