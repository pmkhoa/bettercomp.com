import { defineField, defineType } from 'sanity';
import { UsersIcon } from '@sanity/icons';

export const authorBio = defineType({
  name: 'authorBio',
  title: 'Author Bio',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'teamMember',
      title: 'Team Member',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
  ],
  preview: {
    select: {
      firstName: 'teamMember.firstName',
      lastName: 'teamMember.lastName',
      jobTitle: 'teamMember.jobTitle',
      picture: 'teamMember.picture',
    },
    prepare(selection) {
      return {
        title: `${selection?.firstName} ${selection?.lastName}`,
        subtitle: `${selection?.jobTitle || 'No job title'}`,
        media: selection?.picture,
      };
    },
  },
});
