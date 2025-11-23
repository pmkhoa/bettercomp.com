// /schemas/article.ts
import { DocumentTextIcon } from '@sanity/icons';
import { defineType } from 'sanity';
import { resourceBaseFields, resourceBasePreview } from '../../lib/resourceBase';

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  icon: DocumentTextIcon,
  fields: resourceBaseFields,
  preview: resourceBasePreview('Article'),
});
