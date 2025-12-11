import cn from 'classnames';
import { Richtext } from '@/sanity.types';
import { defaultBackground } from '@/utils/constants';
import { PortableText } from '@/components';

type Props = {
  block: Richtext;
  pageData: any;
};

export default function RichTextWithEmbedded({ block, pageData }: Props) {
  const {
    background = defaultBackground,
    columnContent,
    embeddedContent,
    contentMaxWidth,
    textAlign,
  } = block;
  const { showTOC, useNarrowWidthContent } = pageData;

  let maxWidth = 'w-full';
  if (contentMaxWidth === 'medium') {
    maxWidth = 'max-w-[80%]';
  } else if (contentMaxWidth === 'narrow') {
    maxWidth = 'max-w-2xl';
  }

  const { enabled: backgroundEnabled, backgroundColor, textColor } = background;

  const bgColor = `bg-${backgroundColor}`;
  const sectionTextColor = `text-${textColor}`;

  return (
    <section
      className={cn(
        'section-module section-richtext',
        'rich-text-embed',
        backgroundEnabled ? 'py-16 md:py-20' : 'my-16 md:my-24',
        sectionTextColor,
        backgroundEnabled && bgColor
      )}
    >
      <div className="container">
        <div className={cn('grid-container')}>
          {columnContent && (
            <div
              className={cn(
                useNarrowWidthContent && !showTOC ? 'col-span-12 md:col-span-9' : 'col-span-12',
                `relative`
              )}
            >
              <div
                className={cn(
                  'richtext-inner',
                  `text-${textAlign}`,
                  maxWidth,
                  contentMaxWidth === 'medium' && textAlign === 'center' && 'narrow-paragraph',
                  textAlign === 'center' && 'mx-auto'
                )}
              >
                <PortableText value={columnContent} />
              </div>
            </div>
          )}
          {embeddedContent && (
            <div
              className={cn(
                useNarrowWidthContent
                  ? 'col-start-1 col-span-9 md:col-start 2 md:col-span-7'
                  : 'col-start-1 col-span-12 md:col-start-2 md:col-span-10',
                'relative responsive-iframe-container text-center mt-8',
                'flex flex-col w-full',
                `justify-${textAlign === 'center' ? 'center' : 'flex-start'}`
              )}
            >
              <div
                className={cn(maxWidth, 'max-auto')}
                dangerouslySetInnerHTML={{ __html: embeddedContent }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
