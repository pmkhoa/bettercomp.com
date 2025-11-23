// /schemas/ebook.ts
import { BookIcon } from '@sanity/icons';
import { defineType } from 'sanity';
import { resourceBaseFields, resourceBasePreview } from '../../lib/resourceBase';

export const ebook = defineType({
  name: 'ebook',
  title: 'Ebook',
  type: 'document',
  icon: BookIcon,
  fields: resourceBaseFields,
  preview: resourceBasePreview('Ebook'),
});
