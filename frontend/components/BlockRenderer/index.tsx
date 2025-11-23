import React from 'react';

import { GetPageQueryResult } from '@/sanity.types';
import { dataAttr } from '@/sanity/lib/utils';
import {
  AuthorBio,
  Logos,
  ThreeColumnContentWithIcons,
  TwoColumnsContent,
  Testimonials,
  Stats,
  HeroLarge,
  HeroResource,
  ShortCTA,
  Richtext,
  FormContent,
  AllResources,
  Quotation,
} from '@/components/Modules';

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
  heroLarge: HeroLarge,
  heroResource: HeroResource,
  logos: Logos,
  twoColumnsContent: TwoColumnsContent,
  threeColumnContentWithIcons: ThreeColumnContentWithIcons,
  formContent: FormContent,
  stats: Stats,
  shortCTA: ShortCTA,
  testimonials: Testimonials,
  richtext: Richtext,
  quotation: Quotation,
};

/**
 * Used by the <PageBuilder>, this component renders a the component that matches the block type.
 */
export default function BlockRenderer({
  block,
  index,
  pageId,
  pageType,
  pageData,
}: BlockProps) {
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
    { key: block._key },
  );
}
