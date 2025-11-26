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

  return (
    <section className={cn('section-module section-richtext', 'richtext-default my-20')}>
      <div className="container grid-container">
        <div
          className={cn(
            useNarrowWidthContent && !showTOC ? 'col-span-9' : 'col-span-12',
            'relative',
          )}
        >
          <div className={'richtext-inner'}>
            <PortableText value={columnContent} />
          </div>
        </div>
      </div>
    </section>
  );
}
