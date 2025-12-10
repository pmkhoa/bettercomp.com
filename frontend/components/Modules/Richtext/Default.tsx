import cn from 'classnames';
import { Richtext } from '@/sanity.types';
import PortableText from '@/components/PortableText';

type Props = {
  block: Richtext;
  pageData: any;
};

export default function RichTextDefault({ block, pageData }: Props) {
  const { columnContent, contentMaxWidth, textAlign } = block;
  const { showTOC, useNarrowWidthContent } = pageData;

  let maxWidth = 'w-full';
  if (contentMaxWidth === 'medium') {
    maxWidth = 'max-w-3xl';
  } else if (contentMaxWidth === 'narrow') {
    maxWidth = 'max-w-2xl';
  }

  return (
    <section className={cn('section-module section-richtext', 'richtext-default my-20')}>
      <div className="container grid-container">
        <div
          className={cn(
            useNarrowWidthContent && !showTOC
              ? 'col-span-12 md:col-span-9'
              : 'col-span-12 md:col-span-12',
            'relative'
          )}
        >
          <div
            className={cn(
              'richtext-inner',
              `text-${textAlign}`,
              maxWidth,
              textAlign === 'center' && 'mx-auto'
            )}
          >
            <PortableText value={columnContent} />
          </div>
        </div>
      </div>
    </section>
  );
}
