import { UserIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

/**
 * Person schema.  Define and edit the fields for the 'person' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const author = defineType({
  name: 'author',
  title: 'Author',
  icon: UserIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.firstName}-${doc.lastName}`,
        maxLength: 128,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'jobTitle',
      title: 'Job Title',
      type: 'string',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'Linkedin Url',
      type: 'string',
    }),
    defineField({
      name: 'authorBio',
      title: 'Author Bio',
      type: 'blockContent',
    }),
    defineField({
      name: 'picture',
      title: 'Picture',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => {
            // Custom validation to ensure alt text is provided if the image is present. https://www.sanity.io/docs/validation
            return rule.custom((alt, context) => {
              if ((context.document?.picture as any)?.asset?._ref && !alt) {
                return 'Required';
              }
              return true;
            });
          },
        }),
      ],
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page builder',
      type: 'pageBuilder',
    }),
  ],
  // List preview configuration. https://www.sanity.io/docs/previews-list-views
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      jobTitle: 'jobTitle',
      picture: 'picture',
    },
    prepare(selection) {
      return {
        title: `${selection.firstName} ${selection.lastName}`,
        subtitle: `${selection?.jobTitle || 'No job title'}`,
        media: selection.picture,
      };
    },
  },
});
