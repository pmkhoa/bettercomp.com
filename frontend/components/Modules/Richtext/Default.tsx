import cn from 'classnames';
import { Richtext, GetResourceQueryResult } from '@/sanity.types';
import PortableText from '@/components/PortableText';

type Props = {
  block: Richtext;
  pageData: GetResourceQueryResult;
};

export default function RichTextDefault({ block, pageData }: Props) {
  const { columnContent, contentMaxWidth, textAlign } = block;
  const { showTOC, useNarrowWidthContent } = pageData;

  return (
    <section className={cn('section-module', 'richtext-default my-20')}>
      <div className="container grid-container">
        <div
          className={cn(
            useNarrowWidthContent && !showTOC ? 'col-span-9' : 'col-span-12',
            'relative',
          )}
        >
          <div className={cn(`text-${textAlign}`)}>
            <PortableText value={columnContent} />
          </div>
        </div>
      </div>
    </section>
  );
}
