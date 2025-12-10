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
    maxWidth = 'max-w-3xl';
  } else if (contentMaxWidth === 'narrow') {
    maxWidth = 'max-w-2xl';
  }

  const {
    enabled: backgroundEnabled,
    backgroundType,
    backgroundColor,
    asset,
    textColor,
  } = background;

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
                useNarrowWidthContent && showTOC ? 'col-span-9 md:col-span-9' : 'col-span-12',
                `relative`
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
          )}
          {embeddedContent && (
            <div
              className={cn(
                useNarrowWidthContent ? 'col-span-9' : 'col-span-12',
                'relative responsive-iframe-container text-center mt-8',
                'flex flex-col w-full',
                `justify-${textAlign === 'center' ? 'center' : 'flex-start'}`
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
