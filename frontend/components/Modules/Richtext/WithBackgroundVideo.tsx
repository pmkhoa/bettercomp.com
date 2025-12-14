import cn from 'classnames';

import { BackgroundVideo, PortableText } from '@/components';
import { Richtext } from '@/sanity.types';
import { sanitizeToken, urlForAsset } from '@/sanity/lib/utils';
import { defaultBackground } from '@/utils/constants';
type Props = {
  block: Richtext;
  pageData: any;
};

export default function RichTextWithBackgroundVideo({ block, pageData }: Props) {
  const {
    background = defaultBackground,
    columnContent,
    backgroundVideo,
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

  const bgColor = `bg-${sanitizeToken(backgroundColor)}`;
  const sectionTextColor = `text-${sanitizeToken(textColor)}`;

  return (
    <section
      className={cn(
        'section-module section-richtext',
        'richtext-background-video',
        backgroundEnabled ? 'py-16 md:py-20' : 'my-16 md:my-24',
        sectionTextColor,
        backgroundEnabled && bgColor
      )}
    >
      <div className="container">
        <div className={cn('grid-container')}>
          <div
            className={cn(
              useNarrowWidthContent && !showTOC ? 'col-span-12 md:col-span-9' : 'col-span-12'
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
          {backgroundVideo && urlForAsset(backgroundVideo) && (
            <div
              className={cn(
                useNarrowWidthContent
                  ? 'col-start-1 col-span-9 md:col-start 2 md:col-span-7'
                  : 'col-start-1 col-span-12 md:col-start-2 md:col-span-10',
                'relative responsive-iframe-container text-center'
              )}
            >
              <BackgroundVideo src={urlForAsset(backgroundVideo)} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
