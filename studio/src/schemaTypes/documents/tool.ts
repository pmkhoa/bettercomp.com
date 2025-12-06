// /schemas/ebook.ts
import {BookIcon} from '@sanity/icons'
import {defineType} from 'sanity'
import {orderings, resourceBaseFields, resourceBasePreview} from '../../lib/resourceBase'

export const tool = defineType({
  name: 'tool',
  title: 'Tool',
  type: 'document',
  icon: BookIcon,
  orderings: orderings,
  fields: resourceBaseFields,
  preview: resourceBasePreview('Tool'),
})
