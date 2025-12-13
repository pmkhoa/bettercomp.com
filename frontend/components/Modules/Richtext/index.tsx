import { GetResourceQueryResult, Richtext } from '@/sanity.types';

import DefaultRichText from './Default';
import WithBackgroundVideo from './WithBackgroundVideo';
import WithEmbeddedContent from './WithEmbeddedContent';
import WithImage from './WithImage';

type RichTextProps = {
  block: Richtext;
  pageData: GetResourceQueryResult;
  index: number;
};

export default function RichTextDefault({ block, pageData }: RichTextProps) {
  const enabled = block.enabled;

  if (!enabled) {
    return null;
  }

  const richTextType = block.richTextType;

  if (richTextType === 'default') {
    return <DefaultRichText block={block} pageData={pageData} />;
  }

  if (richTextType === 'withImage') {
    return <WithImage block={block} pageData={pageData} />;
  }

  if (richTextType === 'withEmbedded') {
    return <WithEmbeddedContent block={block} pageData={pageData} />;
  }

  if (richTextType === 'withBackgroundVideo') {
    return <WithBackgroundVideo block={block} pageData={pageData} />;
  }

  return <DefaultRichText block={block} pageData={pageData} />;
}
