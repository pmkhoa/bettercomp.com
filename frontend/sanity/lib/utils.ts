import { buildFileUrl, getFileAsset, getImageDimensions } from '@sanity/asset-utils';
import createImageUrlBuilder from '@sanity/image-url';
import { createDataAttribute, CreateDataAttributeProps } from 'next-sanity';

import { dataset, projectId, studioUrl } from '@/sanity/lib/api';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

export function sanitizeToken(value?: string) {
  if (!value) return '';

  return value
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // zero-width chars
    .replace(/\s+/g, '') // stray spaces
    .trim();
}

export const urlForImage = (source: any) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  const imageRef = source?.asset?._ref;
  const crop = source.crop;

  // get the image's og dimensions
  const { width, height } = getImageDimensions(imageRef);

  if (crop) {
    // compute the cropped image's area
    const croppedWidth = Math.floor(width * (1 - (crop.right + crop.left)));

    const croppedHeight = Math.floor(height * (1 - (crop.top + crop.bottom)));

    // compute the cropped image's position
    const left = Math.floor(width * crop.left);
    const top = Math.floor(height * crop.top);

    // gather into a url
    return imageBuilder?.image(source).rect(left, top, croppedWidth, croppedHeight).auto('format');
  }

  return imageBuilder?.image(source).auto('format');
};

export const getImageDimension = (source: any) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return { width: 0, height: 0 };
  }

  const imageRef = source?.asset?._ref;

  // get the image's og dimensions
  const { width, height } = getImageDimensions(imageRef);

  return { width: width || 0, height: height || 0 };
};

export const urlForAsset = (source: any) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  const asset = getFileAsset(source.asset, { dataset, projectId });
  return buildFileUrl(asset, { dataset, projectId });
};

export function resolveOpenGraphImage(image: any, width = 1200, height = 627) {
  if (!image) return;
  const url = urlForImage(image)?.width(1200).height(627).fit('crop').url();
  if (!url) return;
  return { url, alt: image?.alt as string, width, height };
}

export function linkResolver(link: any) {
  if (!link) return null;

  // If linkType is not set but href exists (pasted URL), default to "href"
  if (!link.linkType && link.href) {
    link.linkType = 'href';
  }

  switch (link.linkType) {
    case 'href':
      return link.href || null;

    case 'file':
      return link.file || null;

    // Internal CMS Page (Sanity document with slug)
    case 'page':
      if (link?.page && link?.page?._type !== 'reference') {
        return `/${link.page}`;
      }
      return null;
    case 'blog':
    case 'ebook':
    case 'caseStudy':
    case 'guide':
    case 'template':
    case 'webinar':
    case 'tool':
      if (link?.[link.linkType] && link?.[link.linkType]?._type !== 'reference') {
        const linkUrl = link[link.linkType];
        return `/${link.linkType}/${linkUrl}`;
      }
      return null;

    default:
      return null;
  }
}

// Depending on the type of link, we need to fetch the corresponding page, post, or URL.  Otherwise return null.

export function linkHelpers(entry: any) {
  if (!entry || !entry._type) return '';

  // Handle resource types
  const resourceTypes = ['blog', 'ebook', 'caseStudy', 'guide', 'template', 'tool', 'webinar'];

  if (resourceTypes.includes(entry._type)) {
    return `/${entry._type}/${entry?.slug?.current ?? ''}`;
  }

  switch (entry._type) {
    case 'author':
      return `/author/${entry?.slug?.current ?? ''}`;

    case 'news':
      return `/news/${entry?.slug?.current ?? ''}`;

    case 'page':
      return `/${entry?.slug?.current ?? ''}`;

    default:
      return '';
  }
}

type DataAttributeConfig = CreateDataAttributeProps &
  Required<Pick<CreateDataAttributeProps, 'id' | 'type' | 'path'>>;

export function dataAttr(config: DataAttributeConfig) {
  return createDataAttribute({
    projectId,
    dataset,
    baseUrl: studioUrl,
  }).combine(config);
}
