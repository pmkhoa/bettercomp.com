// /schemas/ebook.ts
import {BookIcon} from '@sanity/icons'
import {defineType} from 'sanity'
import {orderings, resourceBaseFields, resourceBasePreview} from '../../lib/resourceBase'

export const blog = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  icon: BookIcon,
  orderings: orderings,
  fields: resourceBaseFields,
  preview: resourceBasePreview('blog'),
})
