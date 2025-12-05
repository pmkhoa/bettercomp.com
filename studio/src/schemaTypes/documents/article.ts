// /schemas/article.ts
import {DocumentTextIcon} from '@sanity/icons'
import {defineType} from 'sanity'
import {orderings, resourceBaseFields, resourceBasePreview} from '../../lib/resourceBase'

export const article = defineType({
  name: 'article',
  title: 'Blog',
  type: 'document',
  icon: DocumentTextIcon,
  orderings: orderings,
  fields: resourceBaseFields,
  preview: resourceBasePreview('Article'),
})
