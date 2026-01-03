import {defineType, defineField} from 'sanity'
import {CodeIcon} from '@sanity/icons'

export const htmlEmbed = defineType({
  name: 'htmlEmbed',
  title: 'Raw HTML / Script Embed',
  type: 'object',
  icon: CodeIcon,
  fields: [
    defineField({
      name: 'html',
      title: 'Embed Code',
      type: 'text',
      rows: 8,
      description: 'Paste full embed code (iframe, script, HubSpot, etc.).',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {html: 'html'},
    prepare({html}) {
      return {
        title: 'Raw Embed',
        subtitle: html?.slice(0, 80)?.replace(/\s+/g, ' '),
      }
    },
  },
})
