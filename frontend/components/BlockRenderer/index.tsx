import React from 'react';

import {
  AccordionCenter,
  AccordionLeftPanel,
  AllResources,
  AuthorBio,
  ContactFormInfo,
  FeaturedResources,
  FormContent,
  FullWidthCTA,
  HeroCTA,
  HeroLarge,
  HeroResource,
  HeroShort,
  IconCards,
  Logos,
  Quotation,
  Richtext,
  ShortCTA,
  SideCalloutWithImages,
  Stats,
  Testimonials,
  ThreeColumnContentWithIcons,
  ThreeColumnContentWithNumbers,
  TwoColumnPhotoCards,
  TwoColumnsContent,
} from '@/components/Modules';
import { GetPageQueryResult } from '@/sanity.types';
import { dataAttr } from '@/sanity/lib/utils';

type BlocksType = {
  [key: string]: React.FC<any>;
};

type BlockType = {
  _type: string;
  _key: string;
};

type BlockProps = {
  index: number;
  block: BlockType;
  pageId: string;
  pageType: string;
  pageData: GetPageQueryResult;
};

const Blocks: BlocksType = {
  allResources: AllResources,
  authorBio: AuthorBio,
  accordionLeftPanel: AccordionLeftPanel,
  accordionCenter: AccordionCenter,
  contactForm: ContactFormInfo,
  heroLarge: HeroLarge,
  heroResource: HeroResource,
  heroShort: HeroShort,
  heroCTA: HeroCTA,
  logos: Logos,
  twoColumnsContent: TwoColumnsContent,
  twoColumnPhotoCards: TwoColumnPhotoCards,
  threeColumnContentWithIcons: ThreeColumnContentWithIcons,
  threeColumnContentWithNumbers: ThreeColumnContentWithNumbers,
  formContent: FormContent,
  stats: Stats,
  iconCards: IconCards,
  featuredResources: FeaturedResources,
  shortCTA: ShortCTA,
  fullWidthCTA: FullWidthCTA,
  testimonials: Testimonials,
  richtext: Richtext,
  quotation: Quotation,
  sideCalloutWithImages: SideCalloutWithImages,
};

/**
 * Used by the <PageBuilder>, this component renders a the component that matches the block type.
 */
export default function BlockRenderer({ block, index, pageId, pageType, pageData }: BlockProps) {
  // Block does exist
  if (typeof Blocks[block._type] !== 'undefined') {
    return (
      <div
        key={block._key}
        data-sanity={dataAttr({
          id: pageId,
          type: pageType,
          path: `pageBuilder[_key=="${block._key}"]`,
        }).toString()}
      >
        {React.createElement(Blocks[block._type], {
          key: block._key,
          block,
          index,
          pageData,
        })}
      </div>
    );
  }
  // Block doesn't exist yet
  return React.createElement(
    () => (
      <div className="w-full bg-gray-100 text-center text-gray-500 p-20 rounded">
        A &ldquo;{block._type}&rdquo; block hasn&apos;t been created
      </div>
    ),
    { key: block._key }
  );
}
