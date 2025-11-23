import { ComposeIcon } from '@sanity/icons';
import { defineType } from 'sanity';
import { resourceBaseFields, resourceBasePreview } from '../../lib/resourceBase';

export const webinar = defineType({
  name: 'webinar',
  title: 'Webinar',
  type: 'document',
  icon: ComposeIcon,
  fields: resourceBaseFields,
  preview: resourceBasePreview('Webinar'),
});
