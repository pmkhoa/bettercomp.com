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

export function linkResolver(link: Link | undefined) {
  if (!link) return null;

  // If linkType is not set but href is, lets set linkType to "href".  This comes into play when pasting links into the portable text editor because a link type is not assumed.
  if (!link.linkType && link.href) {
    link.linkType = 'href';
  }

  switch (link.linkType) {
    case 'href':
      return link.href || null;
    case 'file':
      return get(link, 'file') || null;
    case 'page':
      if (link?.page && link?.page?._type !== 'reference') {
        return `/${link.page}`;
      }
      return null;
    case 'blog':
      if (link?.blog && link?.blog?._type !== 'reference') {
        return `/news-press/${link.blog}`;
      }
      return null;
    default:
      return null;
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
