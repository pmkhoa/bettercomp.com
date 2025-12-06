// /schemas/ebook.ts
import {BookIcon} from '@sanity/icons'
import {defineType} from 'sanity'
import {orderings, resourceBaseFields, resourceBasePreview} from '../../lib/resourceBase'

export const guide = defineType({
  name: 'guide',
  title: 'Guide',
  type: 'document',
  icon: BookIcon,
  orderings: orderings,
  fields: resourceBaseFields,
  preview: resourceBasePreview('Guide'),
})
