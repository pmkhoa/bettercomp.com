import createImageUrlBuilder from '@sanity/image-url';
import { Link } from '@/sanity.types';
import { get } from 'lodash';
import { dataset, projectId, studioUrl } from '@/sanity/lib/api';
import { getFileAsset, buildFileUrl } from '@sanity/asset-utils';
import { createDataAttribute, CreateDataAttributeProps } from 'next-sanity';
import { getImageDimensions } from '@sanity/asset-utils';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

export const urlForImage = (source: any) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  const imageRef = source?.asset?._ref;
  const crop = source.crop;

  // get the image's og dimensions
  const { width, height } = getImageDimensions(imageRef);

  if (Boolean(crop)) {
    // compute the cropped image's area
    const croppedWidth = Math.floor(width * (1 - (crop.right + crop.left)));

    const croppedHeight = Math.floor(height * (1 - (crop.top + crop.bottom)));

    // compute the cropped image's position
    const left = Math.floor(width * crop.left);
    const top = Math.floor(height * crop.top);

    // gather into a url
    return imageBuilder
      ?.image(source)
      .rect(left, top, croppedWidth, croppedHeight)
      .auto('format');
  }

  return imageBuilder?.image(source).auto('format');
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

    // @ts-ignore
    case 'file':
      // @ts-ignore
      return link.file || null;

    // Internal CMS Page (Sanity document with slug)
    case 'page':
      if (link?.page && link?.page?._type !== 'reference') {
        return `/${link.page}`;
      }
      return null;
    // Generic resource (article, ebook, case-study, etc.)
    case 'article':
    case 'ebook':
    case 'caseStudy':
    case 'guide':
    case 'template':
    case 'webinar':
    case 'tool':
      if (link?.[link.linkType] && link?.[link.linkType]?._type === 'reference') {
        const ref = link[link.linkType];
        // @ts-ignore
        return `/resources/${link.linkType}/${ref.slug?.current ?? ''}`;
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
  const resourceTypes = [
    'article',
    'ebook',
    'caseStudy',
    'guide',
    'template',
    'tool',
    'webinar',
  ];

  if (resourceTypes.includes(entry._type)) {
    return `/resources/${entry._type}/${entry?.slug?.current ?? ''}`;
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
