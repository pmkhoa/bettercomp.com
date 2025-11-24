import cn from 'classnames';
import { Richtext } from '@/sanity.types';
import { PortableText } from '@/components';

type Props = {
  block: Richtext;
  pageData: any;
};

export default function RichTextWithEmbedded({ block, pageData }: Props) {
  const { columnContent, embeddedContent } = block;
  const { showTOC, useNarrowWidthContent } = pageData;

  return (
    <section className={cn('section-module', 'rich-text-embed', 'my-20')}>
      <div className="container">
        <div className={cn('grid-container')}>
          {columnContent && (
            <div
              className={cn(useNarrowWidthContent && showTOC ? 'col-span-9' : 'col-span-12')}
            >
              <PortableText value={columnContent} />
            </div>
          )}
          {embeddedContent && (
            <div
              className={cn(
                useNarrowWidthContent ? 'col-span-9' : 'col-span-12',
                'relative responsive-iframe-container text-center',
              )}
              dangerouslySetInnerHTML={{
                __html: embeddedContent,
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
