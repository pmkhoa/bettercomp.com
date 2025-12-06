import {EditIcon} from '@sanity/icons'

const PreviewAction = ({draft, published}) => {
  // URL for preview functionality, defaults to localhost:3000 if not set
  const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'
  const slug = draft?.slug?.current || published?.slug?.current
  const pageType = draft?._type || published?._type
  const contentType = draft?.contentType || published?.contentType

  let href = slug

  if (pageType === 'article') {
    href = `/articles/${slug}`
  } else if (pageType === 'caseStudy') {
    href = `/case-studies/${slug}`
  } else if (pageType === 'author') {
    href = `/author/${slug}`
  } else if (pageType === 'whitepaper') {
    href = `/whitepaper/${slug}`
  } else if (pageType === 'template') {
    href = `/template/${slug}`
  } else if (pageType === 'tool') {
    href = `/tool/${slug}`
  } else if (pageType === 'guide') {
    href = `/guide/${slug}`
  } else if (pageType === 'blog') {
    href = `/blog/${slug}`
  } else if (pageType === 'event') {
    href = `/events/${slug}`
  } else if (pageType === 'ebook') {
    href = `/ebook/${slug}`
  } else if (pageType === 'news') {
    href = `/news/${slug}`
  } else if (pageType !== 'page') {
    href = `/${pageType}/${slug}`
  }

  if (!slug) return null // If no slug, no preview

  const previewUrl = `${SANITY_STUDIO_PREVIEW_URL}/${href}`

  return {
    label: 'View URL',
    icon: EditIcon,
    onHandle: () => {
      window.open(previewUrl, '_blank') // Open in a new tab
    },
  }
}

export default PreviewAction
