import { ComposeIcon } from '@sanity/icons';
import { defineType } from 'sanity';
import { resourceBaseFields, resourceBasePreview } from '../../lib/resourceBase';

export const caseStudy = defineType({
  name: 'template',
  title: 'Template',
  type: 'document',
  icon: ComposeIcon,
  fields: resourceBaseFields,
  preview: resourceBasePreview('Template'),
});
