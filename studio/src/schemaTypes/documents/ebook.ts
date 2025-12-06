// /schemas/ebook.ts
import {BookIcon} from '@sanity/icons'
import {defineType} from 'sanity'
import {orderings, resourceBaseFields, resourceBasePreview} from '../../lib/resourceBase'

export const ebook = defineType({
  name: 'ebook',
  title: 'Ebook',
  type: 'document',
  icon: BookIcon,
  orderings: orderings,
  fields: resourceBaseFields,
  preview: resourceBasePreview('Ebook'),
})
