import {ComposeIcon} from '@sanity/icons'
import {defineType} from 'sanity'
import {orderings, resourceBaseFields, resourceBasePreview} from '../../lib/resourceBase'

export const webinar = defineType({
  name: 'webinar',
  title: 'Webinar',
  type: 'document',
  icon: ComposeIcon,
  orderings: orderings,
  fields: resourceBaseFields,
  preview: resourceBasePreview('Webinar'),
})
