import {ComposeIcon} from '@sanity/icons'
import {defineType} from 'sanity'
import {orderings, resourceBaseFields, resourceBasePreview} from '../../lib/resourceBase'

export const template = defineType({
  name: 'template',
  title: 'Template',
  type: 'document',
  icon: ComposeIcon,
  orderings: orderings,
  fields: resourceBaseFields,
  preview: resourceBasePreview('Template'),
})
