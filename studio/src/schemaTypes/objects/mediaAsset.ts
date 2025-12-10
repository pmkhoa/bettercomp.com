import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const mediaAsset = defineType({
  name: 'mediaAsset',
  title: 'Media',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          {title: 'With Image', value: 'withImage'},
          {title: 'With Embedded Content', value: 'withEmbedded'},
          {title: 'With Background Video', value: 'withBackgroundVideo'},
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      hidden: ({parent}) => parent?.mediaType !== 'withImage',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
        }),
        defineField({
          name: 'link',
          type: 'link',
          title: 'Link',
        }),
      ],
    }),
    defineField({
      name: 'embeddedContent',
      title: 'Embedded Content',
      type: 'text',
      hidden: ({parent}) => parent?.mediaType !== 'withEmbedded',
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'With Background Video',
      type: 'file',
      hidden: ({parent}) => parent?.mediaType !== 'withBackgroundVideo',
    }),
  ],
  preview: {
    select: {
      title: 'mediaType',
      image: 'image',
    },
    prepare({title, image}) {
      return {
        title,
        media: image,
      }
    },
  },
})
