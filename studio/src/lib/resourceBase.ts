// /schemas/resourceBase.ts
import { defineField } from 'sanity';
import { format, parseISO } from 'date-fns';

export const resourceBaseFields = [
  defineField({
    name: 'title',
    title: 'Title',
    type: 'string',
    validation: (rule) => rule.required(),
  }),

  defineField({
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    description: 'Auto-generated from the title.',
    options: {
      source: 'title',
      maxLength: 96,
      isUnique: (value, context) => context.defaultIsUnique(value, context),
    },
    validation: (rule) => rule.required(),
  }),

  defineField({
    name: 'mainNavBackground',
    title: 'Main Navgation Background',
    type: 'string',
    options: {
      list: [
        { title: 'Blue', value: 'blue' },
        { title: 'White', value: 'white' },
      ],
      layout: 'dropdown',
    },
    initialValue: 'white',
  }),

  defineField({
    name: 'excerpt',
    title: 'Excerpt',
    type: 'text',
  }),
  defineField({
    name: 'coverImage',
    title: 'Cover Image',
    type: 'image',
    options: {
      hotspot: true,
      aiAssist: { imageDescriptionField: 'alt' },
    },
    fields: [
      {
        name: 'alt',
        type: 'string',
        title: 'Alternative text',
      },
    ],
    validation: (rule) => rule.required(),
  }),

  defineField({
    name: 'date',
    title: 'Published Date',
    type: 'datetime',
    initialValue: () => new Date().toISOString(),
  }),

  defineField({
    name: 'estimatedReadingTime',
    title: 'Estimated Reading Time',
    type: 'string',
  }),

  defineField({
    name: 'showTOC',
    title: 'Show Table of Content',
    description: 'Table of content will automatically add the sidebar TOC',
    type: 'boolean',
    initialValue: false,
  }),

  defineField({
    name: 'useNarrowWidthContent',
    title: 'Use Narrow Width Content',
    description: 'Use Narrow Width Content for Resource Page (2/3 wide)',
    type: 'boolean',
    initialValue: false,
  }),

  defineField({
    name: 'tags',
    title: 'Topics',
    type: 'array',
    of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    options: { layout: 'tags' },
  }),

  defineField({
    name: 'author',
    title: 'Author',
    type: 'reference',
    to: [{ type: 'author' }],
  }),

  defineField({
    name: 'pageBuilder',
    title: 'Page Builder',
    type: 'pageBuilder',
  }),

  defineField({
    name: 'seo',
    title: 'SEO',
    type: 'seo',
  }),
];

export function resourceBasePreview(title = 'Resource') {
  return {
    select: {
      title: 'title',
      authorFirstName: 'author.firstName',
      authorLastName: 'author.lastName',
      date: 'date',
      media: 'coverImage',
    },
    // @ts-ignore
    prepare({ title, media, authorFirstName, authorLastName, date }) {
      const subtitles = [
        authorFirstName && authorLastName && `by ${authorFirstName} ${authorLastName}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean);

      return {
        title: title || `${title}`,
        media,
        subtitle: subtitles.join(' '),
      };
    },
  };
}
